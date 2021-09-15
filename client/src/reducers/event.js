import { actionTypes } from "../actions/event"

const initialState = { eventIndexSelected: null, eventIDSelected: null, eventIDs: [] }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EVENT_INDEX:
            const eventIndexSelected = action.payload
            return {
                ...state,
                eventIndexSelected
            }
        case actionTypes.NAVIGATE_BEFORE_EVENT:
            if (state.eventIndexSelected > 0) {
                return {
                    ...state,
                    eventIndexSelected: state.eventIndexSelected - 1
                }
            }
            return state
        case actionTypes.NAVIGATE_NEXT_EVENT:
            // TODO: check if event is out of bounds
            return {
                ...state,
                eventIndexSelected: state.eventIndexSelected + 1
            }

        default:
            return state
    }
}

export default reducer