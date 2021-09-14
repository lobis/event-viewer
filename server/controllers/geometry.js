import { getGeometryFromFile } from "../jsroot/processing.js"
import fs from "fs"

export const getGeometry = async (req, res) => {
    const file = req.query.file

    try {
        if (!file) {
            res.status(404).json({ message: `file URL parameter was not supplied (mandatory)` })
            return
        }

        if (!fs.existsSync(file)) {
            res.status(404).json({ message: `file '${address}' not found in server file system` })
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