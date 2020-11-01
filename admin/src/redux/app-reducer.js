export const SET_IS_LOGIN_ALERT = 'APP/SET_IS_LOGIN_ALERT'

export const URL = 'http://165.22.192.77/'

let initialState= {
    isLoginAlert: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOGIN_ALERT: {
            return {
                ...state,
                isLoginAlert: action.value,
            }
        }
        default:
            return state
    }
}

export const SetIsLoginAlert = (value) => ({
    type: SET_IS_LOGIN_ALERT,
    value,
})
export default appReducer