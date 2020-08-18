import axios from "axios";
import * as actions from "./action-types"

export const login = (email, password) => (dispatch, getState) => {
    axios({method: "post", url: "/login", data: JSON.stringify({email, password}), headers: getHeaders(getState)})
        .then(res => {
            dispatch({
                type: actions.LOGIN_SUCCESSFUL,
                payload: {
                    user: res.data,
                    token: res.headers.authorization
                }
            })
        })
        .catch(err => {
            dispatch({type: actions.LOGIN_FAILED})
        })
}

export const getLocks = () => (dispatch, getState) => {
    axios({method: "get", url: "/locks", headers: getHeaders(getState)})
        .then(result => {
            dispatch({
                type: actions.GET_LOCKS,
                payload: result.data
            })
        })
}

export const createLock = (lockName, plainTextPassword) => (dispatch, getState) => {
    axios({method: "post", url: "/locks", data: JSON.stringify({lockName, plainTextPassword}), headers: getHeaders(getState)})
        .then(result => {
            dispatch({
                type: actions.CREATE_LOCK,
                payload: result.data
            })
        })
}

const getHeaders = getState => {
    const basicHeaders = {
        'Content-Type': 'application/json'
    }
    const user = getState().user
    if (user && user.token) {
        basicHeaders['Authorization'] = user.token
    }
    return basicHeaders
}