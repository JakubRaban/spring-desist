
import * as actions from './action-types'

export const initialState = {
    user: {
        isLoggedIn: false,
        loading: false
    },
    locks: []
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
                    loading: false
                }
            }
        case actions.GET_LOCKS:
            return {
                ...state,
                locks: action.payload.map(lock => mapLockDateStringToDateObject(lock))
            }
        case actions.CREATE_LOCK:
            return {
                ...state,
                locks: [
                    ...state.locks,
                    mapLockDateStringToDateObject(action.payload)
                ]
            }
        case actions.ACTIVATE_LOCK:
            return {
                ...state,
                locks: [
                    ...state.locks.filter(lock => lock.id !== action.payload.id),
                    mapLockDateStringToDateObject(action.payload)
                ]
            }
        default:
            return state;
    }
}

const mapLockDateStringToDateObject = lock => {
    const mappedLock = {...lock}
    mappedLock.timeActivated = mappedLock.timeActivated ? new Date(mappedLock.timeActivated) : null
    mappedLock.timeCreated = mappedLock.timeCreated ? new Date(mappedLock.timeCreated) : null
    mappedLock.expirationTime = mappedLock.expirationTime ? new Date(mappedLock.expirationTime) : null
    return mappedLock;
}