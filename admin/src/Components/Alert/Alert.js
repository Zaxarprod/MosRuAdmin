import React from 'react'
import style from './Alert.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {getAlertMessage} from "../../redux/edit-selector"
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined'
import {SetAlertMessageAC} from "../../redux/edit-reducer";

const Alert = () => {
    const message = useSelector(getAlertMessage)
    const dispatch = useDispatch()
    return (
        <div className={style.alert + ` ${message==='Заполните все обязательные поля!'?style.red:''}`}>
            <div className={style.cancel} onClick={()=>{
                dispatch(SetAlertMessageAC(''))
            }}>
                <CloseOutlined />
            </div>
            {message}
        </div>
    )
}

export default Alert