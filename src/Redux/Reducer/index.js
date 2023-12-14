import { combineReducers } from "redux";
import { LoginReducer, RegisterReducer } from "./auth";
import { ApplicationUploadReducer, applicationGetReducer, dashboardGetReducer, 
    formCreateReducer, formSaveReducer, getDocumentLinkReducer } from "./Dashboard";

const rootReducer = combineReducers({

    //AUTH
    loginData: LoginReducer,
    registerData: RegisterReducer,

    //FORM
    postForm: formCreateReducer,
    saveForm: formSaveReducer,

    //TABLE
    getTable: applicationGetReducer,

    //DASHBOARD
    getDashboard: dashboardGetReducer,
    postApplicationUpload: ApplicationUploadReducer,

    postDocumentLink: getDocumentLinkReducer

})

export default rootReducer;