
import * as THREE from "three"
import * as api from "./api"
import { useState, useEffect } from "react"

import { useSelector } from "react-redux"

const Geometry = () => {

    const [model, setModel] = useState()

    const file = useSelector((state) => state.file.selectedFile)
    const globalTransparency = useSelector((state) => state.geometry.globalTransparency)

    const loadModel = async (file) => {
        if (!file) {
            setModel(null)
            return
        }

        const loader = new THREE.ObjectLoader()

        api.fetchGeometryForFile(file).then(response => response.data).then(json =>
            loader.parse(json)
        ).then(object => {
            setModel(object)
            console.log("Geometry loaded!")
        })
    }

    const setGlobalTransparency = (transparency) => {
        if (model) {
            model.traverse((node) => {
                if (node.isMesh) {
                    node.material.transparent = true
                    node.material.opacity = 1 - transparency
                }
            })
        }
    }

    useEffect(() => {
        loadModel(file)
    }, [file])

    useEffect(() => {
        setGlobalTransparency(globalTransparency)
    }, [globalTransparency, model])

    return model ? <primitive object={model} /> : null
}

export default Geometry;
