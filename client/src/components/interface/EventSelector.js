import { useDispatch, useSelector } from "react-redux"

import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect } from "react"

import { setEventIndex, navigateBeforeEvent, navigateNextEvent } from "../../actions/event.js"

import IconButton from '@material-ui/core/IconButton'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({

}))

const EventSelector = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const selectedFile = useSelector((state) => state.file.selectedFile)
    useEffect(() => {
        dispatch(setEventIndex(0))
    }, [selectedFile])

    const eventIndex = useSelector((state) => state.event.eventIndexSelected)
    const eventID = useSelector((state) => state.event.eventIDSelected)

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}                >
                    <Typography className={classes.heading}>Event Selector ID: {eventID} - {eventIndex}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <IconButton edge="start" className={classes.menuButton}
                        onClick={() => { dispatch(navigateBeforeEvent()) }}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Typography className={classes.heading}>{eventIndex}</Typography>
                    <IconButton edge="end" className={classes.menuButton}
                        onClick={() => { dispatch(navigateNextEvent()) }}>
                        <NavigateNextIcon />
                    </IconButton>
                </AccordionDetails>
            </Accordion>

        </div>
    )

}

export default EventSelector
