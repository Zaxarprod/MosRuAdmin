import React from 'react'
import style from './AddBlock.module.scss'
import {NavLink} from "react-router-dom";

const AddBlock = () => {
    return (
        <div className={style.wrapper}>
            <NavLink to={'/add'}>
                <div>
                    Добавить животное
                </div>
            </NavLink>
        </div>
    )
}

export default AddBlock