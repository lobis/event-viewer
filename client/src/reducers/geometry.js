import { actionTypes } from "../actions/geometry"

const initialState = { globalTransparency: 0.8, }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GLOBAL_TRANSPARENCY: {
            const globalTransparency = action.payload
            return {
                ...state,
                globalTransparency
            }
        }
        default:
            return state
    }
}

export default reducer