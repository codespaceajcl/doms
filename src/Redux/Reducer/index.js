import { combineReducers } from "redux";
import { LoginReducer, RegisterReducer } from "./auth";
import { applicationGetReducer, formCreateReducer, formSaveReducer } from "./Dashboard";

const rootReducer = combineReducers({

    //AUTH
    loginData: LoginReducer,
    registerData: RegisterReducer,

    //FORM
    postForm: formCreateReducer,
    saveForm: formSaveReducer,

    //TABLE
    getTable: applicationGetReducer

})

export default rootReducer;