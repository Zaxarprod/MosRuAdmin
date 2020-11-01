import React from "react"
import style from './Loader.module.scss'
import loader from './../../common/images/loader.gif'

export const Loader = () => {
    return (
        <div className={style.wrapper}>
            <img src={loader}/>
        </div>
    )
}