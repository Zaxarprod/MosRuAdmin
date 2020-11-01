export const getIsAuth = (state) =>{
    return state.auth.isAuth
}

export const getUser = (state) =>{
    return state.auth.user
}

export const getToken = (state) => {
    return state.auth.token
}

export const getSearchStr = (state) => {
    return state.auth.search
}

export const getAnimalsData = (state) => {
    return state.auth.data
}

export const getCurrentPage = (state) => {
    return state.auth.currentPage
}
