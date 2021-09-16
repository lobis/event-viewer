import * as THREE from "three"

export const getParticleColor = (particleName) => {
    const defaultColor = new THREE.Color("white")
    const particleToColorMap = {
        "e-": new THREE.Color("red"),
        "e+": new THREE.Color("cyan"),
        "gamma": new THREE.Color("lime"),
        "neutron": new THREE.Color("gold"),
        "proton": new THREE.Color("darkblue"),
    }

    const color = particleToColorMap[particleName]

    if (!color) { return defaultColor }
    return color
}


export const getProcessColor = (processName) => {
    const defaultColor = new THREE.Color("yellow")
    return defaultColor
}

