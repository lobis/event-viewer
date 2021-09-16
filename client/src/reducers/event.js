import axios from "axios"
import { actionTypes } from "../actions/event"

const initialState = { eventIDSelected: null, eventIDs: [] }

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
                eventIDSelected
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
            //console.log(index, state.eventIDSelected, state.eventIDs[index + 1], state.eventIDs)
            if (index !== -1 && index < state.eventIDs.length - 1) {
                return {
                    ...state,
                    eventIDSelected: state.eventIDs[index + 1]
                }
            }
            return state
        }
        default:
            return state
    }
}

export default reducer