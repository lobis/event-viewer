
import * as api from "../api"

export const actionTypes = {
    GET_ALL_EVENT_IDS: "GET_ALL_EVENT_IDS",
    SET_EVENT_INDEX: "SET_EVENT_INDEX",
    SET_EVENT_ID: "SET_EVENT_ID",
    NAVIGATE_NEXT_EVENT: "NAVIGATE_NEXT_EVENT",
    NAVIGATE_BEFORE_EVENT: "NAVIGATE_BEFORE_EVENT",
}

export const setEventIndex = (eventIndex) => async (dispatch) => {
    console.log("actions/event/setEventIndex")
    try {
        dispatch({ type: actionTypes.SET_EVENT_INDEX, payload: eventIndex })
    } catch (error) {
        console.error("actions/event/setEventIndex:", error.message)
    }
}

export const navigateBeforeEvent = () => async (dispatch) => {
    console.log("actions/event/navigateBeforeEvent")
    try {
        dispatch({ type: actionTypes.NAVIGATE_BEFORE_EVENT })
    } catch (error) {
        console.error("actions/event/navigateBeforeEvent:", error.message)
    }
}

export const navigateNextEvent = () => async (dispatch) => {
    console.log("actions/event/navigateNextEvent")
    try {
        dispatch({ type: actionTypes.NAVIGATE_NEXT_EVENT })
    } catch (error) {
        console.error("actions/event/navigateNextEvent:", error.message)
    }
}
