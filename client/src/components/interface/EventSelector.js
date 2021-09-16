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

import IconButton from '@material-ui/core/IconButton'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 300,
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
}))

const EventSelector = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const selectedFile = useSelector((state) => state.file.selectedFile)
    const eventIDs = useSelector((state) => state.event.eventIDs)
    const eventID = useSelector((state) => state.event.eventIDSelected)

    useEffect(() => {
        if (!selectedFile) { return }
        dispatch(getAllEventIDs(selectedFile))
    }, [dispatch, selectedFile])

    useEffect(() => {
        if (!eventIDs || !selectedFile) { return }
        dispatch(setEventID(eventIDs[0]))
    }, [dispatch, eventIDs, selectedFile])

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}                >
                    <Typography className={classes.heading}>Event Selector ID: {eventID}</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Grid container spacing={2}>

                        {eventID ? <Grid item xs={8}>

                            <Typography>Event {eventIDs.indexOf(eventID) + 1} of {eventIDs.length} ({((eventIDs.indexOf(eventID) + 1) / eventIDs.length * 100).toFixed(2)}%) </Typography>
                        </Grid> : null}

                        <Grid item xs={8}>

                            <FormControl className={classes.formControl} >
                                <InputLabel>Event ID</InputLabel>
                                <Select
                                    value={eventID ? eventID : ""}
                                    onChange={(event) => { dispatch(setEventID(event.target.value)) }}
                                >
                                    {eventIDs.map(id => <MenuItem key={id} value={id}>{id}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>

                            <div>
                                <IconButton edge="start" className={classes.menuButton}
                                    onClick={() => { dispatch(navigateBeforeEvent()) }}>
                                    <NavigateBeforeIcon />
                                </IconButton>
                                <IconButton edge="end" className={classes.menuButton}
                                    onClick={() => { dispatch(navigateNextEvent()) }}>
                                    <NavigateNextIcon />
                                </IconButton>
                            </div>
                        </Grid>

                    </Grid>

                </AccordionDetails>
            </Accordion>

        </div>
    )

}

export default EventSelector
