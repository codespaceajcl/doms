import axios from "axios";

export const AuthLogin = (inputData) => async (dispatch) => {
    try {
        dispatch({
            type: "LOGIN_REQUEST",
        });

        const { data } = await axios.post("doms/login/", inputData);

        if (data.response === 'error') {

            dispatch({
                type: "LOGIN_FAILED",
                payload: data.message,
                success: false,
            });

        }

        else {

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: data,
                success: true,
            });

            localStorage.setItem("user", JSON.stringify(data));

        }

    }
    catch (e) {
        dispatch({
            type: "LOGIN_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};