
import * as api from "../api"

export const actionTypes = {
    SET_GLOBAL_TRANSPARENCY: "SET_GLOBAL_TRANSPARENCY",
    SET_ENABLE: "SET_ENABLE"
}

export const setGlobalTransparency = (transparency) => async (dispatch) => {
    console.log("actions/geometry/setGlobalTransparency")
    try {
        if (transparency < 0 || transparency > 1) {
            throw new Error(`Invalid transparency value '${transparency}', valid range [0, 1]`)
        }
        dispatch({ type: actionTypes.SET_GLOBAL_TRANSPARENCY, payload: transparency })
    } catch (error) {
        console.error("actions/geometry/setGlobalTransparency:", error.message)
    }
}


export const setEnable = (truth) => async (dispatch) => {
    console.log("actions/geometry/setEnable")
    try {
        dispatch({ type: actionTypes.SET_ENABLE, payload: truth })
    } catch (error) {
        console.error("actions/geometry/setEnable:", error.message)
    }
}