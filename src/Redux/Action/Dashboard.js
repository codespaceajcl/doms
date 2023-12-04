import axios from "axios";
// import api from "../../Utils/Interceptor";

export const FormCreate = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "FORM_POST_REQUEST",
        });

        const { data } = await axios.post("doms/addDirectorateOfLandAndRehabilitation/", formData);

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