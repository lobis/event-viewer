import { actionTypes } from "../actions/file"

const initialState = { files: [], selectedFile: null }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_FILE:
            const file = action.payload
            return {
                ...state,
                selectedFile: file
            }
        case actionTypes.GET_AVAILABLE_FILES:
            const files = action.payload
            return {
                ...state,
                files
            }
        default:
            return state
    }
}

export default reducer