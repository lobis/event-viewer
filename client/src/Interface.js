
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import EventSelector from "./components/interface/EventSelector.js"
import FileSelector from "./components/interface/FileSelector.js"
import GeometrySettings from "./components/interface/GeometrySettings.js"

const Interface = () => {
    return <AppBar position="static">
        <Toolbar variant="dense">
            <FileSelector />
            <EventSelector />
            <GeometrySettings />
        </Toolbar>
    </AppBar>
}

export default Interface
