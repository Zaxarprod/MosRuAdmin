import React from 'react'
import style from './AnimalCart.module.scss'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SetAnimalAC} from "../../../redux/edit-reducer";

const AnimalCart = ({animal}) => {
    const dispatch = useDispatch()
    return (
        <NavLink to={`/cart/${animal.animal_accounting_card}`} onClick={()=>{
           // dispatch(SetAnimalAC(animal))
        }}>
            <div className={style.cart}>
                <div>
                    <h2>{animal.name}</h2>
                    <h3>{animal.kind==='c'?'Кошка':'Собака'}</h3>
                </div>
                <p>{animal.animal_accounting_card}</p>
            </div>
        </NavLink>
    )
}

export default AnimalCart