import express from "express"

//

import { getEvent } from "../controllers/index.js"

export const routerEvent = express.Router()

routerEvent.get("/", getEvent)

//

import { getGeometry } from "../controllers/index.js"

export const routerGeometry = express.Router()

routerGeometry.get("/", getGeometry)

//

import { getAvailableFiles } from "../controllers/index.js"

export const routerFiles = express.Router()

routerFiles.get("/", getAvailableFiles)