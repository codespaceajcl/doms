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

export const RegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                loading: false,
                getRegisterData: action.payload,
                error: false
            }
        case "REGISTER_FAILED":
            return {
                ...state,
                loading: false,
                getRegisterData: null,
                error: action.payload
            }
        case "REGISTER_RESET":
            return {
                ...state,
                getRegisterData: null,
                error: null
            }
        default:
            return state
    }
}