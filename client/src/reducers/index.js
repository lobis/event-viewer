import { combineReducers } from "redux"

import file from "./file"
import event from "./event"
import geometry from "./geometry"

export default combineReducers({
    file,
    event,
    geometry,
})