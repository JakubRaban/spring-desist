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
            result.data.plainTextPassword = plainTextPassword
            dispatch({
                type: actions.CREATE_LOCK,
                payload: result.data
            })
        })
}

export const activateLock = (lock, durationInSeconds) => (dispatch, getState) => {
    axios({method: 'patch', url: `/locks/${lock.id}/activate`, data: `PT${durationInSeconds}S`, headers: getHeaders(getState, false)})
        .then(result => {
            dispatch({
                type: actions.ACTIVATE_LOCK,
                payload: result.data
            })
        })
}

export const deleteLock = lock => (dispatch, getState) => {
    axios({method: 'delete', url: `/locks/${lock.id}`, headers: getHeaders(getState)})
        .then(result => {
            dispatch({
                type: actions.DELETE_LOCK,
                payload: lock
            })
        })
}

const getHeaders = (getState, isJson = true) => {
    const basicHeaders = {
        'Content-Type': isJson ? 'application/json' : 'text/plain'
    }
    const user = getState().user
    if (user && user.token) {
        basicHeaders['Authorization'] = user.token
    }
    return basicHeaders
}