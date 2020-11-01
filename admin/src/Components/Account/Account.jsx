import React, {useState} from 'react'
import style from './Account.module.scss'
import {connect, useSelector} from "react-redux";
import {getAlertMessage, getAnimal, getForm, getLink} from "../../redux/edit-selector";
import {Col, Row} from "antd";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {AddFormTC, delAnimalTC, SetAlertMessageAC, SetAnimalTC, SetFormTC} from "../../redux/edit-reducer";
import {Loader} from "../Loader/Loader";
import {getAnimalsData, getIsAuth} from "../../redux/auth-selector";
import {Field, Form, Formik} from "formik";

const Account = ({animal, form, AddFormTC, obj, SetAlertMessageAC, link, delAnimalTC, alertMessage}) => {
    let data = useSelector(getAnimalsData)
    const [isEdit, setIsEdit] = useState(false)
    
    if(!animal){
        return (<Loader />)
    }
    if(alertMessage==='Животное удалено'){
        return <Redirect to={'/search'} />
    }
    return (
        <div className={style.wrapper}>
            <Row>
                <Col span={3}></Col>
                <Col span={18} className={style.content}>
                    {isEdit &&
                    <div>
                        <Formik
                            initialValues={animal}
                            validate={values =>{}}
                            onSubmit={(values, { setSubmitting }) => {
                                let valid = false
                                let arr = []
                                debugger
                                /*Object.keys(values).map(el=>{
                                    if(form[el]['*']){
                                        if(!values[el].length){
                                            arr.push(1)
                                            SetAlertMessageAC('Заполните все обязательные поля!')
                                        }
                                    }
                                })*/
                                debugger
                                console.log(arr.length)
                                if(!arr.length){
                                    AddFormTC(values)
                                }
                                debugger
                                setIsEdit(false)
                                setSubmitting(false)
                            }}

                        >

                            {({ isSubmitting }) => (
                                <Form className={style.form}>
                                    {Object.keys(form).map(el=>{
                                        if(el==='animal_accounting_card'){
                                            return <div></div>
                                        }
                                        return (
                                            <div className={style.item}>
                                                <p>{form[el].text}
                                                    <span style={{color:'red'}}> {form[el]['*']?'*':''}</span>
                                                </p>
                                                {Array.isArray(form[el].values)?
                                                    <Field as="select" name={el}>
                                                        <option>не выбрано</option>
                                                        {form[el].values.map(opt=>{
                                                            return (<option value={opt}>
                                                                {opt}
                                                            </option>)
                                                        })}
                                                    </Field>
                                                    :form[el].values==='bool'?
                                                        <Field as="select" name={el}>
                                                            <option>
                                                                Не выбрано
                                                            </option>
                                                            <option value={true}>
                                                                Да
                                                            </option>
                                                            <option value={false}>
                                                                Нет
                                                            </option>
                                                        </Field>
                                                        :
                                                        <Field type="text"
                                                               name={el}
                                                               placeholder={`Введите данные типа ${form[el].values}`}/>
                                                }
                                                <hr/>
                                            </div>
                                        )
                                    })}
                                    <div>
                                        <button type="submit" disabled={isSubmitting}>
                                            Сохранить
                                        </button>
                                    </div>
                                </Form>

                            )}

                        </Formik>
                    </div>
                    }
                    {!isEdit &&
                        <>
                    <div className={style.topBlock}>
                        <h2>{animal.name}</h2>
                        {data && data.status!=='d' &&
                        <>
                        {!isEdit && <div className={style.edit}
                                onClick={()=>{
                                    setIsEdit(!isEdit)
                                }
                                }
                            >
                                {!isEdit?'Редактировать':'Сохранить'}
                            </div>}
                            <a href={link?'http://165.22.192.77/'+link:''} style={{textDecoration:'none', color:'white'}}>
                                <div className={style.edit}>
                                        Получить отчет
                                </div>
                            </a>
                            <div className={style.delete} onClick={()=>{
                                delAnimalTC(animal.animal_accounting_card)
                            }
                            }>
                                Удалить
                            </div>
                        </>
                        }
                    </div>
                    <img src={`http://165.22.192.77/media/photos/${animal.animal_accounting_card}.jpg`}/>
                    {Object.keys(animal).map(el=>{
                        return (<p><span style={{fontWeight:'bold'}}>{el}</span>: {animal[el]}</p>)
                    })}
                    </>
                    }
                </Col>
                <Col span={3}></Col>
            </Row>
        </div>
    )
}

class AccountContainer extends React.Component {
    state = {
        animal: this.props.animal
    }
    componentDidMount() {
        this.props.SetAnimalTC(this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1])
        this.props.SetFormTC()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.animal !== this.props.animal){
            this.setState({
                animal: this.props.animal
            })
        }
    }

    render(){
        let obj = {}
        console.log(this.props.link)
        if(this.props.animal){
            Object.keys(this.props.animal).map(el=>{
                obj[el] = this.props.animal[el]
            })
        }
        return (<Account
            animal={this.state.animal}
            form={this.props.form}
            AddFormTC={this.props.AddFormTC}
            SetAlertMessageAC={this.props.SetAlertMessageAC}
            obj = {obj}
            link={this.props.link}
            delAnimalTC={this.props.delAnimalTC}
            alertMessage={this.props.alertMessage}
        />)
    }
}

let mapStateToProps = (state) => ({
    animal: getAnimal(state),
    form: getForm(state),
    link: getLink(state),
    alertMessage: getAlertMessage(state),
})

export default withRouter(connect(mapStateToProps,{SetFormTC, AddFormTC, SetAlertMessageAC, SetAnimalTC, delAnimalTC})(AccountContainer))