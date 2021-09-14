import Background from "./Background"
import Geometry from "./Geometry"

import ReactDOM from "react-dom"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useState } from "react"

import "./styles/canvas.css"

const Interface = ({ children }) => {
    return ReactDOM.createPortal(
        children,
        document.getElementById("interface")
    );
}
const App = () => {

    const [file, setFile] = useState()
    //setFile("test/example-simulation.root")

    return (
        <>
            <Canvas camera={{ fov: 45, position: [500, 500, 1500], near: 5, far: 10000 }}>
                <OrbitControls />
                <Background />
                <Geometry file="test/example-simulation.root" />
            </Canvas>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("canvas"),
)