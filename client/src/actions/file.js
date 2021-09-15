
import * as api from "../api"

export const actionTypes = {
    GET_AVAILABLE_FILES: "GET_AVAILABLE_FILES",
    SET_FILE: "SET_FILE",
}

export const setFile = (file) => async (dispatch) => {
    console.log("actions/setFile")
    try {
        dispatch({ type: actionTypes.SET_FILE, payload: file })
    } catch (error) {
        console.error("actions/file/setFile:", error.message)
    }
}

export const getAvailableFiles = () => async (dispatch) => {
    console.log("actions/getAvailableFiles")
    try {
        const { data } = await api.fetchAvailableFiles()
        dispatch({ type: actionTypes.GET_AVAILABLE_FILES, payload: data })
    } catch (error) {
        console.error("actions/file/getAvailableFiles:", error.message)
    }
}