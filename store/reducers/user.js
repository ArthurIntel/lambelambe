import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADED_USER, LOADING_USER } from '../actions/actionTypes'

const initialState = {
    name: null,
    email: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,//clonar o Estado inicial
                name: action.payload.name,
                email: action.payload.email
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                name: null,
                email: null
            }
        case LOADING_USER:
            return {
                ...state,
                isLoading: true
            }
        case LOADED_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default reducer