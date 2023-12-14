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

export const formSaveReducer = (state = {}, action) => {
    switch (action.type) {
        case "FORM_SAVE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "FORM_SAVE_SUCCESS":
            return {
                ...state,
                loading: false,
                formSaveData: action.payload,
            };
        case "FORM_SAVE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "FORM_SAVE_RESET":
            return {
                ...state,
                formSaveData: null,
                error: null
            };
        default:
            return state;
    }
}

export const applicationGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "APPLICATION_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "APPLICATION_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                tableGetData: action.payload,
            };
        case "APPLICATION_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const dashboardGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "DASHBOARD_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DASHBOARD_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                dashGetData: action.payload,
            };
        case "DASHBOARD_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const ApplicationUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case "APPLICATION_UPLOAD_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "APPLICATION_UPLOAD_SUCCESS":
            return {
                ...state,
                loading: false,
                applicationUploadData: action.payload,
            };
        case "APPLICATION_UPLOAD_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "APPLICATION_UPLOAD_RESET":
            return {
                ...state,
                applicationUploadData: null,
                error: null
            };
        default:
            return state;
    }
}

export const getDocumentLinkReducer = (state = {}, action) => {
    switch (action.type) {
        case "DOCUMENT_LINK_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DOCUMENT_LINK_SUCCESS":
            return {
                ...state,
                loading: false,
                documentLinkData: action.payload,
            };
        case "DOCUMENT_LINK_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "DOCUMENT_LINK_RESET":
            return {
                ...state,
                documentLinkData: null,
                error: null
            };
        default:
            return state;
    }
}