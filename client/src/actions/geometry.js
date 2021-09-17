
import * as api from "../api"

export const actionTypes = {
    SET_GLOBAL_TRANSPARENCY: "SET_GLOBAL_TRANSPARENCY",
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
