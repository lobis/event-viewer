import { useDispatch, useSelector } from "react-redux"

import Typography from '@material-ui/core/Typography';

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect } from "react"

import { getAllEventIDs, setEventID, navigateBeforeEvent, navigateNextEvent } from "../../actions/event.js"
import { setGlobalTransparency, setEnable } from "../../actions/geometry.js"

import IconButton from '@material-ui/core/IconButton'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 200,
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
}))

const GeometrySettings = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const globalTransparency = useSelector((state) => state.geometry.globalTransparency)
    const enable = useSelector((state) => state.geometry.enable)

    console.log("GLOBAL TRANSPARENCY:", globalTransparency)

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}                >
                    <Typography className={classes.heading}>Geometry Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl} >
                                <Checkbox
                                    value={enable}
                                    onChange={
                                        (event, newValue) => {
                                            dispatch(setEnable(newValue))
                                        }
                                    } />
                                <InputLabel>Enable</InputLabel>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.heading}>Global Transparency: {globalTransparency}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider value={globalTransparency} onChange={(event, newValue) => {
                                dispatch(setGlobalTransparency(newValue))
                            }} min={0.00} max={1.00} step={0.01}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </div>
    )

}

export default GeometrySettings
