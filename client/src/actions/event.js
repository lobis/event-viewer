
import * as api from "../api"

export const actionTypes = {
    GET_ALL_EVENT_IDS: "GET_ALL_EVENT_IDS",
    SET_EVENT_ID: "SET_EVENT_ID",
    NAVIGATE_NEXT_EVENT: "NAVIGATE_NEXT_EVENT",
    NAVIGATE_BEFORE_EVENT: "NAVIGATE_BEFORE_EVENT",
    LOAD_TRACKS: "LOAD_TRACKS",
}

export const getAllEventIDs = (file) => async (dispatch) => {
    console.log("actions/event/getAllEventIDs")
    try {
        const { data } = await api.fetchListOfEventIDsForFile(file)
        dispatch({ type: actionTypes.GET_ALL_EVENT_IDS, payload: data })
    } catch (error) {
        console.error("actions/event/getAllEventIDs:", error.message)
    }
}

export const setEventID = (eventID) => async (dispatch) => {
    console.log("actions/event/setEventID")
    try {
        dispatch({ type: actionTypes.SET_EVENT_ID, payload: eventID })
    } catch (error) {
        console.error("actions/event/setEventID:", error.message)
    }
}

export const loadTracks = (file, eventID) => async (dispatch) => {
    console.log("actions/event/loadTracks")
    try {
        const { data } = await api.fetchEventByIDForFile(file, eventID)
        dispatch({ type: actionTypes.LOAD_TRACKS, payload: data })
    } catch (error) {
        console.error("actions/event/loadTracks:", error.message)
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
