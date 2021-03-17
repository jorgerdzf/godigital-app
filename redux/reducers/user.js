import {
    USER_STATE_CHANGED,
    USER_POST_STATE_CHANGED,
    CLEAR_DATA
} from "../constants"

const initialState = {
    currentUser: null,
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGED:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_POST_STATE_CHANGED:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case CLEAR_DATA:
            return {
                currentUser: null,
            }
        default:
            return state
    }

}