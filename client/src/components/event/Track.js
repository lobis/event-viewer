import * as THREE from "three"
import { useState, useEffect } from "react"
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline"
import { extend } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import { Points } from "three"

import { useSelector } from "react-redux"

import { getParticleColor, getProcessColor } from "./colors.js"

extend({ MeshLine, MeshLineMaterial, Points })

const Track = ({ particleName, steps }) => {

    const timeGlobalSelectedRange = useSelector((state) => state.event.timeGlobalSelectedRange)


    const positions = []
    steps.forEach(step => {
        if (step.fTimeGlobal >= timeGlobalSelectedRange[0] && step.fTimeGlobal <= timeGlobalSelectedRange[1]) {
            positions.push([step.fX, step.fY, step.fZ])
        }
    })

    const color = getParticleColor(particleName)

    const getThickness = (energy) => {
        let value = energy / 100000
        if (value > 10) value = 10
        return Math.max(value, 0.5)
    }

    const thickness = getThickness(steps[0].fTrackKineticEnergy)

    return ((positions.length !== 0) ?
        <Line
            points={positions}
            color={color}
            lineWidth={thickness}
        /> : null
    )
}

export default Track
