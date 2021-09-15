import Background from "./Background"
import Geometry from "./Geometry"
import Interface from "./Interface"

import ReactDOM from "react-dom"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import React from "react"

import reducers from "./reducers"

import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"

import "./styles/canvas.css"

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const App = () => {

    return (
        <>
            <Provider store={store}>
                <Interface />
            </Provider>

            <Canvas camera={{ fov: 45, position: [500, 500, 1500], near: 5, far: 10000 }}>
                <OrbitControls />
                <Background />
                <Provider store={store}>
                    <Geometry />
                </Provider>
            </Canvas>
        </>
    )
}

ReactDOM.render(
    <App />
    ,
    document.getElementById("root"),
)