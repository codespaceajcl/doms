import axios from "axios";
import { getCurrentUser } from "../../Utils/Helper";
// import api from "../../Utils/Interceptor";

export const FormCreate = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "FORM_POST_REQUEST",
        });

        const { data } = await axios.post("doms/previewDirectorateOfLandAndRehabilitation/", formData);

        dispatch({
            type: "FORM_POST_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "FORM_POST_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const FormSave = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "FORM_SAVE_REQUEST",
        });

        const { data } = await axios.post("doms/addDirectorateOfLandAndRehabilitation/", formData);

        dispatch({
            type: "FORM_SAVE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "FORM_SAVE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const applicationGet = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "APPLICATION_GET_REQUEST",
        });

        const { data } = await axios.post("doms/getAllDirectorateOfLandAndRehabilitation/", formData);

        dispatch({
            type: "APPLICATION_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "APPLICATION_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const dashboardGet = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "DASHBOARD_GET_REQUEST",
        });

        const { data } = await axios.post("doms/getSummary/", formData);

        dispatch({
            type: "DASHBOARD_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "DASHBOARD_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

