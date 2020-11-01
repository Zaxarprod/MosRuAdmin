import React, {useState} from 'react'
import style from './Add.module.scss'
import {connect, useSelector} from "react-redux";
import {Col, Row} from "antd";
import AddBlock from "../AddBlock/AddBlock";
import {LoginTC} from "../../redux/auth-reducer";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AddFormTC, SetAlertMessageAC, SetFormTC} from "../../redux/edit-reducer";
import {getForm, getIsValidate} from "../../redux/edit-selector";
import {Redirect} from "react-router-dom";
import {getIsAuth} from "../../redux/auth-selector";

const Add = ({form, AddFormTC, obj, SetAlertMessageAC}) => {
    const isAuth = useSelector(getIsAuth)
    if(!isAuth){
        return <Redirect to={'/'} />
    }
    return (
         <div className={style.wrapper}>
             {Object.keys(obj).length &&  <Row>
                <Col span={3}></Col>
                <Col span={18} className={style.content}>
                    <h2>Добавление животного</h2>
                    <div>
                        <Formik
                            initialValues={obj}
                            validate={values =>{}}
                            onSubmit={(values, { setSubmitting }) => {
                                let valid = false
                                let arr = []
                                debugger
                                Object.keys(values).map(el=>{
                                    if(form[el]['*']){
                                        if(!values[el].length){
                                            arr.push(1)
                                            SetAlertMessageAC('Заполните все обязательные поля!')
                                        }
                                    }
                                })
                                debugger
                                console.log(arr.length)
                                if(!arr.length){
                                    AddFormTC(values)
                                }
                                debugger
                                setSubmitting(false)
                            }}

                        >

                            {({ isSubmitting }) => (
                                <Form className={style.form}>
                                    {Object.keys(form).map(el=>{
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
                                            Добавить
                                        </button>
                                    </div>
                                </Form>

                            )}

                        </Formik>
                    </div>
                </Col>
                <Col span={3}></Col>
            </Row>}
        </div>
    )
}

class AddContainer extends React.Component{
    componentDidMount() {
        this.props.SetFormTC()
    }
    render(){
        let obj = {}
        Object.keys(this.props.form).map(el=>{
            obj[el] = ''
        })
        return (
            <Add
                form={this.props.form}
                AddFormTC={this.props.AddFormTC}
                SetAlertMessageAC={this.props.SetAlertMessageAC}
                obj = {obj}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    form: getForm(state),
    isValidate: getIsValidate(state),
    isAuth: getIsAuth(state),
})

export default connect(mapStateToProps,{SetFormTC, AddFormTC, SetAlertMessageAC})(AddContainer)