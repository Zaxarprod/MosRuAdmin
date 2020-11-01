import {createStore, compose} from 'redux';
import {combineReducers} from 'redux';
import {applyMiddleware} from 'redux';
import Middleware from 'redux-thunk';
import appReducer from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {editReducer} from "./edit-reducer";
//import { reducer as formReducer } from 'redux-form';


let reducers = combineReducers(
    {
        app: appReducer,
        auth: authReducer,
        edit: editReducer,
    }
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(Middleware)));

window.getStore = () => {
    console.log(store.getState())
}

export default store;