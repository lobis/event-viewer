import { useDispatch, useSelector } from "react-redux"

import Typography from '@material-ui/core/Typography';

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from "react"

import { updateTimeSelection } from "../../actions/event.js"

import IconButton from '@material-ui/core/IconButton'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

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

const EventSettings = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const timeGlobalTotalRange = useSelector((state) => state.event.timeGlobalTotalRange)
    const timeGlobalSelectedRange = useSelector((state) => state.event.timeGlobalSelectedRange)

    const [playing, setPlaying] = useState(false)

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}                >
                    <Typography className={classes.heading}>Event Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography >From: {timeGlobalSelectedRange[0].toExponential().replace(/e\+?/, ' x 10^')} ns</Typography>
                            <Typography >To: {timeGlobalSelectedRange[1].toExponential().replace(/e\+?/, ' x 10^')} ns</Typography>
                            <Slider
                                value={timeGlobalSelectedRange}
                                min={timeGlobalTotalRange[0]} max={timeGlobalTotalRange[1]} step={(timeGlobalTotalRange[1] - timeGlobalTotalRange[0]) / 1E3}
                                onChange={(event, newValue) => {
                                    dispatch(updateTimeSelection(newValue))
                                }}
                                valueLabelDisplay="auto"
                                getAriaValueText={(value) => {
                                    const number = value.toExponential().replace(/e\+?/, ' x 10^')
                                    return `${number}`
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <IconButton edge="start" className={classes.menuButton}
                                onClick={async () => {
                                    if (!playing) {
                                        setPlaying(true)
                                        const step = 1
                                        let time = 0

                                        function sleep(ms) {
                                            return new Promise(resolve => setTimeout(resolve, ms));
                                        }

                                        while (time < 100) {
                                            time += step
                                            console.log(time)
                                            dispatch(updateTimeSelection([0, time]))
                                            await sleep(30)
                                        }
                                        setPlaying(false)
                                    }
                                }}>
                                {!playing ? <PlayCircleFilledWhiteIcon /> : <PauseCircleFilledIcon />}
                            </IconButton>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </div>
    )

}

export default EventSettings
