
import * as actions from './action-types'

export const initialState = {
    user: {
        isLoggedIn: false
    },
    locks: [],
    registrationSuccessful: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN_SUCCESSFUL:
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.payload.token,
                    isLoggedIn: true,
                }
            }
        case actions.REGISTRATION_SUCCESSFUL:
            return {
                ...state,
                registrationSuccessful: true
            }
        case actions.GET_LOCKS:
            return {
                ...state,
                locks: action.payload.map(lock => mapLockDateStringsToDateObjects(lock))
            }
        case actions.CREATE_LOCK:
            return {
                ...state,
                locks: [
                    ...state.locks,
                    mapLockDateStringsToDateObjects(action.payload)
                ]
            }
        case actions.ACTIVATE_LOCK:
            return {
                ...state,
                locks: [
                    ...state.locks.filter(lock => lock.id !== action.payload.id),
                    mapLockDateStringsToDateObjects(action.payload)
                ]
            }
        case actions.OPEN_LOCK:
            action.payload.openedLock.plainTextPassword = action.payload.plainTextPassword
            return {
                ...state,
                locks: [
                    ...state.locks.filter(lock => lock.id !== action.payload.openedLock.id),
                    mapLockDateStringsToDateObjects(action.payload.openedLock)
                ]
            }
        case actions.DELETE_LOCK:
            return {
                ...state,
                locks: state.locks.filter(lock => lock.id !== action.payload.id)
            }
        default:
            return state;
    }
}

const mapLockDateStringsToDateObjects = lock => {
    const mappedLock = {...lock}
    mappedLock.timeActivated = mappedLock.timeActivated ? new Date(mappedLock.timeActivated) : null
    mappedLock.timeCreated = mappedLock.timeCreated ? new Date(mappedLock.timeCreated) : null
    mappedLock.expirationTime = mappedLock.expirationTime ? new Date(mappedLock.expirationTime) : null
    return mappedLock;
}