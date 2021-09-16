import axios from "axios"

const HOST = process.env.REACT_APP_HOST || "localhost"
const PORT = process.env.REACT_APP_PORT || 5000

const baseURL = `http://${HOST}:${PORT}`

export const fetchAvailableFiles = () => axios.get(`${baseURL}/files`)
export const fetchListOfEventIDsForFile = (file) => axios.get(`${baseURL}/event/list?file=${file}`)
export const fetchGeometryForFile = (file) => axios.get(`${baseURL}/geometry?file=${file}`)
export const fetchEventByIDForFile = (file, eventID) => axios.get(`${baseURL}/event?file=${file}&eventID=${eventID}`)
