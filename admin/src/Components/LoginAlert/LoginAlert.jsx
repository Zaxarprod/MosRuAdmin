import React from "react"
import style from './LoginAlert.module.scss'
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import {Field, Form, Formik} from "formik";
import {LoginTC} from "../../redux/auth-reducer";
import {useDispatch} from "react-redux";
import {SetIsLoginAlert} from "../../redux/app-reducer";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import WechatOutlined from "@ant-design/icons/lib/icons/WechatOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";

export const LoginAlert = () =>{
    const dispatch = useDispatch()
    return (
        <div className={style.dark}>
            <div className={style.formBlock}>
                <div className={style.cancel} onClick={()=>{
                    dispatch(SetIsLoginAlert(false))
                }}>
                    <CloseOutlined />
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {}}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(LoginTC(values.email,values.password))
                        setSubmitting(false)
                    }}

                >

                    {({ isSubmitting }) => (
                        <Form className={style.form}>
                            <h3>ВХОД</h3>
                            <Field type="text" name="email" placeholder={'Логин'}/>
                            <Field type="password" name="password" placeholder={'Пароль'}/><br/>
                            <div>
                                <button type="submit" disabled={isSubmitting}>
                                    Войти
                                </button>
                                <a>
                                    Регистрация
                                </a>
                            </div>
                            <a>
                                Забыли пароль?
                            </a>
                            <div className={style.line}></div>
                            <a style={{fontSize:'8px',textAlign:'center',textDecoration:'underline'}}>
                                При входе вы подтверждаете согласие<br/>
                                с условиями использования
                            </a>
                        </Form>

                    )}

                </Formik>
            </div>
        </div>
    )
}