import axios from "axios"
import { actionTypes } from "../actions/event"

const initialState = {
    eventIDSelected: null, eventIDs: [], tracks: [],
    timeGlobalTotalRange: [0, 0], timeGlobalSelectedRange: [0, 0]
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.GET_ALL_EVENT_IDS: {
            const eventIDs = action.payload
            return {
                ...state,
                eventIDs
            }
        }

        case actionTypes.SET_EVENT_ID: {
            const eventIDSelected = action.payload
            return {
                ...state,
                eventIDSelected,
            }
        }

        case actionTypes.NAVIGATE_BEFORE_EVENT: {
            const index = state.eventIDs.indexOf(state.eventIDSelected)
            if (index > 0) {
                return {
                    ...state,
                    eventIDSelected: state.eventIDs[index - 1]
                }
            }
            return state
        }

        case actionTypes.NAVIGATE_NEXT_EVENT: {
            const index = state.eventIDs.indexOf(state.eventIDSelected)
            if (index !== -1 && index < state.eventIDs.length - 1) {
                return {
                    ...state,
                    eventIDSelected: state.eventIDs[index + 1]
                }
            }
            return state
        }

        case actionTypes.LOAD_TRACKS: {

            const tracks = action.payload
            let timeGlobalMax = 0
            tracks.forEach(track => {
                track.fSteps.forEach(step => {
                    if (step.fTimeGlobal > timeGlobalMax) {
                        timeGlobalMax = step.fTimeGlobal
                    }
                })
            })
            const timeGlobalTotalRange = [0, Math.min(timeGlobalMax, 10 * 1E2)]
            return {
                ...state,
                tracks,
                timeGlobalTotalRange,
                timeGlobalSelectedRange: timeGlobalTotalRange
            }
        }

        case actionTypes.UPDATE_TIME_SELECTION: {
            const selection = action.payload

            if (selection[0] < state.timeGlobalTotalRange[0]) { selection[0] = state.timeGlobalTotalRange[0] }
            if (selection[1] > state.timeGlobalTotalRange[1]) { selection[1] = state.timeGlobalTotalRange[1] }

            return {
                ...state,
                timeGlobalSelectedRange: selection
            }
        }

        default:
            return state
    }
}

export default reducer