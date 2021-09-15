
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
//import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAvailableFiles, setFile } from "./actions/file.js"

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
//import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 300,
    },
}))

const Interface = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const files = useSelector((state) => state.file.files)
    const selectedFile = useSelector((state) => state.file.selectedFile)

    useEffect(() => {
        dispatch(getAvailableFiles())
    }, [dispatch])


    return <AppBar position="static">
        <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit"
                onClick={
                    () => dispatch(setFile(null))
                }>
                <ClearIcon />
            </IconButton>

            <FormControl className={classes.formControl} >
                <InputLabel id="demo-simple-select-label">Simulation ROOT file</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedFile ? selectedFile : ""}
                    onChange={
                        (event) => { dispatch(setFile(event.target.value)) }
                    }
                >
                    {
                        files.map(file => <MenuItem key={file} value={file}>{file}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </Toolbar>
    </AppBar>
}

export default Interface
