import { combineReducers } from "redux";
import { LoginReducer, RegisterReducer } from "./auth";
import { applicationGetReducer, dashboardGetReducer, 
    formCreateReducer, formSaveReducer, tractPlotGetReducer } from "./Dashboard";

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
    getPlotData: tractPlotGetReducer

})

export default rootReducer;