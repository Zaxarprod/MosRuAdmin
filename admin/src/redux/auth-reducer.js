import axios from "axios"
import {SetIsLoginAlert} from "./app-reducer";

export const LOGIN = 'AUTH/LOGIN'
export const SET_ME = 'AUTH/SET-ME'
export const LOGOUT = 'AUTH/LOGOUT'
export const SET_DATA = 'AUTH/SET_DATA'
export const SET_CURR_PAGE = 'AUTH/SET_CURR_PAGE'

let initialState= {
    isAuth: false,
    user: null,
    token: localStorage.getItem('token'),
    data: null,
    search: '',
    currentPage: 1,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.data,
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                //token: null,
                user: null,
            }
        case LOGIN:
            return {
               ...state,
                isAuth: true,
                //token: action.token,
            }
        case SET_ME:
            return {
                ...state,
                user: action.user,
                isAuth: true,
            }
        case SET_CURR_PAGE:
            return {
                ...state,
                currentPage: action.value,
            }
        default:
            return state
    }
}

const SetCurrPageAC = (value)=>({
    type: SET_CURR_PAGE,
    value
})
const LoginAC = (token) => ({
    type: LOGIN,
    token
})

export const LogoutAC = () => ({
    type: LOGOUT,
})

const SetDataAC = (data) => ({
    type: SET_DATA,
    data,
})

const SetMeAC = (user) => ({
    type: SET_ME,
    user,
})

export const SetDataTC = (curr = 1, search ='') => {
    return async (dispatch) => {
        let obj = {
            filters: {},
            search: search,
            page: curr,
        }
        debugger
        let data = await axios.post('http://165.22.192.77/s2b/api/v1/admin/', obj,{
            headers:{
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        }).then(res=>res.data)
        debugger
        console.log(data)
        await dispatch(SetDataAC(data))
        dispatch(SetCurrPageAC(curr))
    }
}

export const SetMeTC = () => {
    return async (dispatch) => {
        let data = await axios.get('http://165.22.192.77/s2b/api/v1/auth/users/me/',{
            headers:{
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        }).then(res=>res.data)
        console.log(data)
        dispatch(SetMeAC(data))
        dispatch(SetDataTC())
    }
}

export const LogoutTC = (token) => {
    return async (dispatch) => {
        debugger
        /*let data = await axios.post('http://165.22.192.77/s2b/api/v1/auth/token/logout/',{
            headers:{
                Authorization: `Token ${token}`,
            }
        })*/
        localStorage.removeItem('token')
        debugger
        dispatch(LogoutAC())
    }
}

export const LoginTC = (mail, pass) => {
    return async (dispatch) => {
        let data = await axios.post('http://165.22.192.77/s2b/api/v1/auth/token/login/',{
            username: mail,
            password: pass,
        }).then(res=>
            {
                localStorage.setItem('token', res.data.auth_token);
                return res.data.auth_token
            }
        )
        await dispatch(LoginAC(data))
        await dispatch(SetMeTC())
        dispatch(SetIsLoginAlert(false))
    }
}