
import * as actions from './action-types'
import * as OperationPhase from '../OperationPhase'

export const initialState = {
    user: {
        isLoggedIn: false
    },
    locks: [],
    actions: {
        lockCreate: {
            phase: OperationPhase.NOT_EXECUTED,
        },
        register: {
            phase: OperationPhase.NOT_EXECUTED
        },
        registerConfirm: {
            phase: OperationPhase.NOT_EXECUTED
        },
        login: {
            phase: OperationPhase.NOT_EXECUTED
        }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN_INIT:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    login: {
                        phase: OperationPhase.INIT
                    }
                }
            }
        case actions.LOGIN_SUCCESSFUL:
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.payload.token,
                    isLoggedIn: true,
                },
                actions: {
                    ...state.actions,
                    login: {
                        phase: OperationPhase.SUCCESS
                    }
                }
            }
        case actions.LOGIN_FAILED:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    login: {
                        phase: OperationPhase.FAIL
                    }
                }
            }
        case actions.REGISTRATION_INIT:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    register: {
                        phase: OperationPhase.INIT
                    }
                }
            }
        case actions.REGISTRATION_SUCCESSFUL:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    register: {
                        phase: OperationPhase.SUCCESS
                    }
                }
            }
        case actions.REGISTRATION_FAIL:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    register: {
                        phase: OperationPhase.FAIL,
                        error: action.payload.message
                    }
                }
            }
        case actions.CONFIRMATION_INIT:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    registerConfirm: {
                        phase: OperationPhase.INIT
                    }
                }
            }
        case actions.CONFIRMATION_SUCCESSFUL:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    registerConfirm: {
                        phase: OperationPhase.SUCCESS
                    }
                }
            }
        case actions.CONFIRMATION_FAILED:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    registerConfirm: {
                        phase: OperationPhase.FAIL
                    }
                }
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
                ],
                actions: {
                    ...state.actions,
                    lockCreate: {
                        phase: OperationPhase.SUCCESS
                    }
                }
            }
        case actions.CREATE_LOCK_FAILED:
            return {
                ...state,
                actions: {
                    ...state.actions,
                    lockCreate: {
                        phase: OperationPhase.FAIL,
                        error: action.payload.message
                    }
                }
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