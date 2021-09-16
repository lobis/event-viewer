import fs from "fs"
import path from "path"

const uploads = "server/uploads/"

const getFilePathInServer = (file) => {
    if (!file) return null
    return uploads + file
}

// Files

export const getAvailableFiles = async (req, res) => {
    // check if directory is OK
    if (!fs.lstatSync(uploads).isDirectory()) {
        // not a valid directory
        const message = `UPLOADS DIRECTORY NOT FOUND: ${uploads}`
        res.status(404).json({ message })
    }

    const files = []
    fs.readdirSync(uploads).forEach(file => {
        console.log(file)
        if (file.split('.').pop() === "root") {
            files.push(file)
        }
    })
    res.status(200).json(files)
}

// Events

import { getEventFromFile, getAvailableEventIDsFromFile } from "../jsroot/index.js"

export const getEvent = async (req, res) => {
    const file = getFilePathInServer(req.query.file)
    const eventIndex = req.query.n
    const eventID = req.query.eventID

    try {
        console.log(`controllers - event.js - getEvent - query -> file: ${file}, eventIndex: ${eventIndex}, eventID: ${eventID}`)

        if (!file) {
            res.status(404).json({ message: `file URL parameter was not supplied (mandatory)` })
            return
        }

        if (!fs.existsSync(file)) {
            res.status(404).json({ message: `file '${file}' not found in server file system` })
            return
        }

        console.log("calling 'getEventFromFile'")
        let response = await getEventFromFile(file, eventIndex, eventID)
        if (!response) {
            res.status(404).json({ message: `event not found in '${file}'` })
            return
        }
        
        res.status(200).json(response)

    } catch (error) {
        console.error(`Failed to get event (index: ${eventIndex} / eventID: ${eventID}) for file ${file}`)
        console.error("getEvent", error.message)
        res.status(404).json({ message: error.message })
    }
}

export const getAvailableEventIDs = async (req, res) => {
    const file = getFilePathInServer(req.query.file)
    try {
        console.log(`controllers - event.js - getAvailableEventIDs - query -> file: ${file}`)

        if (!file) {
            res.status(404).json({ message: `file URL parameter was not supplied (mandatory)` })
            return
        }

        if (!fs.existsSync(file)) {
            res.status(404).json({ message: `file '${file}' not found in server file system` })
            return
        }

        console.log("calling 'getAvailableEventIDsFromFile'")
        const response = await getAvailableEventIDsFromFile(file)

        res.status(200).json(response)

    } catch (error) {
        console.error(`Failed to get event ids for file ${file}`)
        console.error("getAvailableEventIDs", error.message)
        res.status(404).json({ message: error.message })
    }
}

// Geometry

import { getGeometryFromFile } from "../jsroot/index.js"

export const getGeometry = async (req, res) => {
    const file = getFilePathInServer(req.query.file)

    try {
        if (!file) {
            res.status(404).json({ message: `file URL parameter was not supplied (mandatory)` })
            return
        }

        if (!fs.existsSync(file)) {
            res.status(404).json({ message: `file '${file}' not found in server file system` })
            return
        }

        console.log("calling 'getGeometry'")
        let response = await getGeometryFromFile(file)

        res.status(200).json(response)

    } catch (error) {
        console.error(`Failed to get geometry for file ${file}`)
        console.error("getGeometry", error.message)
        res.status(404).json({ message: error.message })
    }
}