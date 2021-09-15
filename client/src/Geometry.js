
import * as THREE from "three"
import * as api from "./api"
import { useState, useEffect } from "react"
import { useThree } from '@react-three/fiber'

import { useDispatch, useSelector } from "react-redux"

const Geometry = () => {

    const file = useSelector((state) => state.file.selectedFile)

    const [model, setModel] = useState()

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

    useEffect(() => {
        loadModel(file)
    }, [file])

    return model ? <primitive object={model} /> : null
}

export default Geometry;
