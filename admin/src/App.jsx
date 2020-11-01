import './App.scss'
import Header from "./Components/Header/Header";
import {connect, useSelector} from "react-redux";
import {getIsLoginAlert} from "./redux/app-selector";
import React from "react";
import {LoginAlert} from "./Components/LoginAlert/LoginAlert";
import {getIsAuth} from "./redux/auth-selector";
import {SetMeTC} from "./redux/auth-reducer";
import {Route} from "react-router-dom";
import AnimalsList from "./Components/AnimalsList/AnimalsList";
import {Layout} from 'antd'
import Add from "./Components/Add/Add";
import Account from "./Components/Account/Account";
import {getAlertMessage} from "./redux/edit-selector";
import Alert from "./Components/Alert/Alert";
const {Content } = Layout

function App({alertMessage}) {
    const isLoginAlert = useSelector(getIsLoginAlert)
    return (
        <div className="App">
            {alertMessage && <Alert />}
            {isLoginAlert && <LoginAlert />}
            <Header />
            <Content>
                <Route path ='/search' render={()=> {
                    return <AnimalsList />;
                }} />
                <Route path ='/add' render={()=> {
                    return <Add />;
                }} />
                <Route path ='/cart' render={()=> {
                    return <Account />;
                }} />
            </Content>
        </div>
    )
}

class AppContainer extends React.Component{
    componentDidMount() {
        this.props.SetMeTC()
    }

    render() {
        return <App
            alertMessage={this.props.alertMessage}
        />
    }
}

let mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    alertMessage: getAlertMessage(state)
})

export default connect(mapStateToProps, {SetMeTC})(AppContainer);
