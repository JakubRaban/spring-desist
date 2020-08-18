
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
                locks: action.payload
            }
        case actions.CREATE_LOCK:
            return {
                ...state,
                locks: [
                    ...state.locks,
                    action.payload
                ]
            }
        default:
            return state;
    }
}