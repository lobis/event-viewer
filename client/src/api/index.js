import axios from "axios"

const HOST = process.env.REACT_APP_HOST || "localhost"
const PORT = process.env.REACT_APP_PORT || 5000

const baseURL = `http://${HOST}:${PORT}`

export const fetchAvailableFiles = () => axios.get(`${baseURL}/files`)
export const fetchGeometryForFile = (file) => axios.get(`${baseURL}/geometry?file=${file}`)
//export const fetchEventForFile = (file, eventIndex, eventID) => axios.get(`${baseURL}/event?file=${address}`)