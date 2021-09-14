import { getEventFromFile } from "../jsroot/processing.js"
import fs from "fs"

export const getEvent = async (req, res) => {
    const file = req.query.file
    const eventIndex = req.query.n
    const eventID = req.query.eventID

    try {
        console.log(`controllers - event.js - getEvent - query -> file: ${file}, eventIndex: ${eventIndex}, eventID: ${eventID}`)

        if (!file) {
            res.status(404).json({ message: `file URL parameter was not supplied (mandatory)` })
            return
        }

        if (!fs.existsSync(file)) {
            res.status(404).json({ message: `file '${address}' not found in server file system` })
            return
        }

        console.log("calling 'getEventFromFile'")
        let response = await getEventFromFile(file, eventIndex, eventID)

        res.status(200).json(response)

    } catch (error) {
        console.error(`Failed to get event (index: ${eventIndex} / eventID: ${eventID}) for file ${file}`)
        console.error("getEvent", error.message)
        res.status(404).json({ message: error.message })
    }
}