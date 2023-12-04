import { combineReducers } from "redux";
import { LoginReducer } from "./auth";
import { formCreateReducer } from "./Dashboard";

const rootReducer = combineReducers({

    //AUTH
    loginData: LoginReducer,

    //FORM
    postForm: formCreateReducer

})

export default rootReducer;