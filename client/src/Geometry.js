
import * as THREE from "three"
import { useState, useEffect } from "react"
import { useThree } from '@react-three/fiber'

const Geometry = ({ file }) => {

    const [model, setModel] = useState(undefined)

    const loadModel = (file) => {
        const url = `http://localhost:5000/geometry?file=${file}`
        const loader = new THREE.ObjectLoader();
        fetch(url).then(response => response.json()).then(json => loader.parse(json)).then(object => {
            setModel(object)
            console.log("Geometry loaded!")
        })
    }

    useEffect(() => {
        if (!file) return
        loadModel(file)
    }, [file])

    return model ? <primitive object={model} /> : null
}

export default Geometry;
