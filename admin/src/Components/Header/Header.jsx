import React, {useState} from 'react'
import style from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {SetIsLoginAlert} from "../../redux/app-reducer";
import {getIsAuth, getToken, getUser} from "../../redux/auth-selector";
import {NavLink} from "react-router-dom";
import {LogoutTC} from "../../redux/auth-reducer";

const Header = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(getIsAuth)
    const token = useSelector(getToken)
    const user = useSelector(getUser)
    const [isOpenedUser, setIsOpenedUser] = useState(false)
    return (
        <div className={style.header}>
            <div className={style.brand}>
               Admin
            </div>
            <div className={style.nav}>
                <NavLink to={'/search'} activeClassName={style.active}>
                    Посмотреть животных
                </NavLink>
            </div>
            <div className={style.loginBlock}>
                {!isAuth && <div className={style.login}>
                    <div onClick={()=>{
                        dispatch(SetIsLoginAlert(true))
                    }}>
                        Войти
                    </div>
                </div>}
                {isAuth && user &&
                    (
                        <>
                        <div>{user.username}</div>
                        <div className={style.user} onClick={()=>{
                            setIsOpenedUser(!isOpenedUser)
                        }
                        }>
                        </div>
                        <div className={style.list + ` ${isOpenedUser?style.openList:style.closeList}`} onClick={
                            ()=>{
                                setIsOpenedUser(false)
                            }
                        }>

                            <div
                                onClick={()=>{
                                dispatch(LogoutTC(token))
                            }}
                                >
                                Выход
                            </div>
                        </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Header