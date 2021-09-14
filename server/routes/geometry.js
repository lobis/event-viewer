import express from "express"

import { getGeometry } from "../controllers/geometry.js"

const router = express.Router()

router.get("/", getGeometry)

export default router