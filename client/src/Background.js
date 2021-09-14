import React from "react"
import { Stars } from "@react-three/drei"

function Background() {

    return (
        <>
            <Stars
                radius={1500} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={10000} // Amount of stars (default=5000)
                factor={4} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                true // Faded dots (default=false)
            />
            <ambientLight intensity={0.2} />
            <hemisphereLight intensity={0.3} skyColor={0xB1E1FF} groundColor={0xB97A20} />
        </>
    )
}

export default Background