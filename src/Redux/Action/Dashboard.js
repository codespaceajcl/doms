import axios from "axios";
import { decryptWithRSA } from "../../Components/Decryption/Decryption";
import CryptoJS from 'crypto-js';

let password = "lazydog";
let salt = "salt";
let iterations = 128;

let bytes = CryptoJS.PBKDF2(password, salt, { keySize: 48, iterations: iterations });
let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

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

        const decryptedData = data?.data?.map((item) => {
            const obj = {
                ...item,
                address: CryptoJS.AES.decrypt(item.address, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                cdaSerialNo: CryptoJS.AES.decrypt(item.cdaSerialNo, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                city: CryptoJS.AES.decrypt(item.city, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                country: CryptoJS.AES.decrypt(item.country, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                date: CryptoJS.AES.decrypt(item.date, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                fullName: CryptoJS.AES.decrypt(item.fullName, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                fatherName: CryptoJS.AES.decrypt(item.fatherName, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                street: CryptoJS.AES.decrypt(item.street, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                sector: CryptoJS.AES.decrypt(item.sector, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                plot: CryptoJS.AES.decrypt(item.plot, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                state: CryptoJS.AES.decrypt(item.state, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                plotSize: CryptoJS.AES.decrypt(item.plotSize, key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                videOrderDate: CryptoJS.AES.decrypt(item.videOrderDate, key, { iv: iv }).toString(CryptoJS.enc.Utf8)
            }
            return obj
        }
        )

        dispatch({
            type: "APPLICATION_GET_SUCCESS",
            payload: decryptedData,
            success: true,
        })


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

export const ApplicationUpload = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "APPLICATION_UPLOAD_REQUEST",
        });

        const { data } = await axios.post("doms/uploadDirectorateOfLandAndRehabilitationSignOff/", formData);

        dispatch({
            type: "APPLICATION_UPLOAD_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "APPLICATION_UPLOAD_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};


export const getDocumentLink = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "DOCUMENT_LINK_REQUEST",
        });

        const { data } = await axios.post("doms/printDocument/", formData);

        dispatch({
            type: "DOCUMENT_LINK_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "DOCUMENT_LINK_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};