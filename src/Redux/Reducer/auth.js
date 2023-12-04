export const LoginReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                getLoginData: action.payload,
                error: false
            }
        case "LOGIN_FAILED":
            return {
                ...state,
                loading: false,
                getLoginData: null,
                error: action.payload
            }
        case "LOGIN_RESET":
            return {
                ...state,
                getLoginData: null,
                error: null
            }
        default:
            return state
    }
}