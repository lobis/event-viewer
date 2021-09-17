import { actionTypes } from "../actions/geometry"

const initialState = { globalTransparency: 0.8, enable: true}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GLOBAL_TRANSPARENCY: {
            const globalTransparency = action.payload
            return {
                ...state,
                globalTransparency
            }
        }
        case actionTypes.SET_ENABLE: {
            const enable = action.payload
            return {
                ...state,
                enable
            }
        }    
        default:
            return state
    }
}

export default reducer