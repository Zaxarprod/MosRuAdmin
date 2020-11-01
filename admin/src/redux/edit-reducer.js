import axios from "axios"

export const SET_FORM = 'EDIT/SET_FORM'
export const SET_ANIMAL = 'EDIT/SET_ANIMAL'
export const SET_ALERT_MESSAGE = 'EDIT/SET_ALERT_MESSAGE'
export const SET_LINK = 'EDIT/SET_LINK'

export const URL = 'http://165.22.192.77/'

let initialState = {
    isEdit: false,
    isAdding: false,
    animal: null,
    form: {},
    alertMessage: '',
    isValidate: false,
    link: '',
}

export const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LINK:
            return {
                ...state,
                link: action.value,
            }
        case SET_ALERT_MESSAGE:
            return {
                ...state,
                alertMessage: action.value,
                isValidate: action.value==='Заполните все обязательные поля!'?true:false,
            }
        case SET_FORM:
            return {
                ...state,
                form: action.form,
            }
        case SET_ANIMAL:
            debugger
            return {
                ...state,
                animal: action.value,
            }
        default:
            return state
    }

}

export const SetLinkAC = (value) => ({
    type: SET_LINK,
    value,
})

export const SetAlertMessageAC = (value) => ({
    type: SET_ALERT_MESSAGE,
    value,
})

export const SetFormAC = (form) => ({
    type: SET_FORM,
    form,
})

export const SetAnimalAC = (value) => ({
    type: SET_ANIMAL,
    value
})

export const delAnimalTC = (cart) => {
    return async (dispatch) => {
        let data = await axios.post('http://165.22.192.77/s2b/api/v1/admin/delete/', {
            animal_accounting_card: cart,
        },{
            headers:{
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        }).then(res=>res.data.data)
        dispatch(SetAlertMessageAC(data))
        debugger
    }
}

export const SetLinkTC = (cart) => {
    return async (dispatch) => {
        debugger
        let data = await axios.get(`http://165.22.192.77/s2b/api/v1/admin/report/?animal_accounting_card=${cart}`,{
            headers:{
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        }).then(res=>res.data.path)
        dispatch(SetLinkAC(data))
        debugger
        console.log(data)
    }
}


export const SetAnimalTC = (id) =>{
    return async (dispatch) => {
        debugger
        let data = await axios.get(`http://165.22.192.77/s2b/api/v1/admin/?animal_accounting_card=${id}`,{
            headers:{
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        }).then(res=>{
            dispatch(SetAnimalAC(res.data.data))
            dispatch(SetLinkTC(id))
        })
        debugger
        console.log(data)
    }
}

export const SetFormTC = () => {
    return async (dispatch) => {
        let data = await axios.get('http://165.22.192.77/s2b/api/v1/admin/add/',{
            headers:{
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        }).then(res=>res.data)
        dispatch(SetFormAC(data))
    }
}

export const AddFormTC = (form) => {
    return async (dispatch) => {
        let h = {
            anamnesis: "sdfds",
            animal_accounting_card: "22222222",
            animal_id: "resresser",
            birth_date: "ewrewrewrewr",
            breed: "бирма",
            cage_number: "22",
            catching_act: "dfds",
            catching_act_date: "sdfdsfs",
            catching_act_order: "dsfdsf",
            catching_address: "dd",
            color: "голубой с подпалом",
            doctor_name: "dshhhhfds",
            ears: "Полустоячие ",
            entrance_act: "dsf",
            entrance_act_date: "dsf",
            hair: "Бесшерстная",
            identifying_marks: "fdsfds",
            kind: "c",
            leaving_act_date: "dsffff",
            leaving_act_reason: "l",
            legal_entity: "",
            medical_checkup_date: "dsfds",
            name: "Zakharrrrrrr",
            owner_name: "",
            parasites_treatment: "dsfds",
            person_owner_name: "",
            region: "dsfdsf",
            sex: "Мужской",
            size: "Средний",
            socialized: "true",
            staff_name: "dsf",
            sterilization_date: "dsfgggds",
            tail: "Крючком ",
            vaccinations: "dsfds",
            weight: "33",
        }
        debugger
        let data = await axios.post('http://165.22.192.77/s2b/api/v1/admin/add/',form,{
            data: h,
            headers:{
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        }).then(res=>{
            if(typeof res.data.data === "string" || res.data.data instanceof String){
                dispatch(SetAlertMessageAC(res.data.data))
            }
            return res
        })
        debugger
    }
}

