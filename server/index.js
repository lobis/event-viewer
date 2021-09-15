
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import { routerEvent, routerGeometry, routerFiles } from "./routes/index.js"

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("../client/build"))

app.use("/event", routerEvent)
app.use("/geometry", routerGeometry)
app.use("/files", routerFiles)

app.listen(PORT, () => {
    console.log(`Starting server - Listening at http://localhost:${PORT}`)
})