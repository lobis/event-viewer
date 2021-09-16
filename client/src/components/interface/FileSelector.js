
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAvailableFiles, setFile } from "../../actions/file.js"

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
        maxWidth: 300,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
}))

const FileSelector = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const files = useSelector((state) => state.file.files)
    const selectedFile = useSelector((state) => state.file.selectedFile)

    useEffect(() => {
        dispatch(getAvailableFiles())
    }, [dispatch])


    return (
        <Card className={classes.root}>
            <CardContent>

                <IconButton edge="start" className={classes.menuButton}
                    onClick={() => dispatch(setFile(null))}>
                    <ClearIcon />
                </IconButton>

                <FormControl className={classes.formControl} >
                    <InputLabel id="demo-simple-select-label">Input ROOT file</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedFile ? selectedFile : ""}
                        onChange={(event) => { dispatch(setFile(event.target.value)) }}
                    >
                        {
                            files.map(file => <MenuItem key={file} value={file}>{file}</MenuItem>)
                        }
                    </Select>
                </FormControl>

            </CardContent>
        </Card>
    )
}

export default FileSelector
