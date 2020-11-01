import React, {useEffect, useState} from "react"
import style from './Paginator.module.scss'
import {useDispatch, useSelector} from "react-redux"

export const Paginator = ({count, func, current}) => {
    let arr = []
    for(let i = 1; i<count; i++){
        arr.push(i)
    }
    let dispatch = useDispatch()
    return (
        <div className={style.paginator}>
            {current>(1) && <div
                onClick={
                    ()=>{
                        func(current-1)
                    }
                }
            >...</div>}
            {arr.map((el)=>{
                if(el>=current && el<=(current+3)){
                    return (
                        <div className={el===current?style.curr:''}
                             onClick={
                                 ()=>{
                                     func(el)
                                 }
                             }
                        >{el}</div>
                    )
                }
            })}
            {current<(count-3) && <div
                 onClick={
                     ()=>{
                         func(current+1)
                     }
                 }
            >...</div>}
            <div className={count===current?style.curr:''}
                            onClick={
                                ()=>{
                                    func(count)
                                }
                            }
            >{count}</div>
        </div>
    )
}