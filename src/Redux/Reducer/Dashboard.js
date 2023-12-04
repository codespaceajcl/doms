export const formCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "FORM_POST_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "FORM_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                formCreateData: action.payload,
            };
        case "FORM_POST_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "FORM_POST_RESET":
            return {
                ...state,
                formCreateData: null,
                error: null
            };
        default:
            return state;
    }
}
