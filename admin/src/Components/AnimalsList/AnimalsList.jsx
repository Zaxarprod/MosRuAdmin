import React, {useState} from 'react'
import style from './AnimalsList.module.scss'
import {Col, Row} from "antd";
import Search from "antd/es/input/Search";
import {connect, useDispatch, useSelector} from "react-redux";
import {getAnimals, getAnimalsData, getCurrentPage, getIsAuth, getSearchStr} from "../../redux/auth-selector";
import AnimalCart from "./AnimalCart/AnimalCart";
import {Paginator} from "../Paginator/Paginator";
import {SetDataTC} from "../../redux/auth-reducer";
import AddBlock from "../AddBlock/AddBlock";
import {Redirect} from "react-router-dom";

const AnimalsList = ({data,current, func, SetDataTC}) => {
    const dispatch = useDispatch()
    const SearchStr = useSelector(getSearchStr)
    const [currentSearch, setCurrSearch] = useState(SearchStr)
    let onSearch = (value, event) => {
        debugger
        SetDataTC(1, value)
    }
    let onChange = (e) => {
        setCurrSearch(e.target.value)
    }
    const isAuth = useSelector(getIsAuth)
    if(!isAuth){
        return <Redirect to={'/'} />
    }
    return (
        <div className={style.animalPage}>
            {data && data.status!=='d' && <Row>
                <Col span={3}></Col>
                <Col span={18} className={style.content}>
                    <AddBlock />
                </Col>
                <Col span={3}></Col>
            </Row>}
            <Row>
                <Col span={3}></Col>
                <Col span={18} className={style.content}>
                    <div className={style.header}>
                        <h2>Фильтр</h2>
                    </div>
                    <div className={style.search}>
                        <Search placeholder="Поиск по номеру карточки"
                                onSearch={onSearch}
                                enterButton
                                className={style.inputSearch}
                                value={currentSearch}
                                onChange={onChange}
                        />
                    </div>
                </Col>
                <Col span={3}></Col>
            </Row>
            {data && <Row>
                <Col span={3}></Col>
                <Col span={18} className={style.content}>
                    <div className={style.filter}>

                    </div>
                    <div className={style.animals}>
                        {data && data.data.map(el=>{
                            return (<AnimalCart animal={el} />)
                        })}
                        <Paginator
                            current={current}
                            count={data.total_page_count}
                            func={func}
                        />
                    </div>
                </Col>
                <Col span={3}></Col>
            </Row>}
        </div>
    )
}

class AnimalsListContainer extends React.Component {
    func = (value) => {
        this.props.SetDataTC(value, this.props.search)
    }
    render(){
        return (
            <AnimalsList
                data={this.props.data}
                current={this.props.current}
                func={this.func}
                SetDataTC={this.props.SetDataTC}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    data: getAnimalsData(state),
    current: getCurrentPage(state),
    search: getSearchStr(state),
    isAuth: getIsAuth(state),
})

export default connect(mapStateToProps,{SetDataTC})(AnimalsListContainer)