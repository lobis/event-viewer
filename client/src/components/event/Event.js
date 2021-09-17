import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { loadTracks } from "../../actions/event.js"
import Track from "./Track.js"

const Event = () => {

    const dispatch = useDispatch()

    const selectedFile = useSelector((state) => state.file.selectedFile)
    const eventID = useSelector((state) => state.event.eventIDSelected)
    const tracks = useSelector((state) => state.event.tracks)

    useEffect(() => {
        if (!selectedFile || !eventID) { return }
        dispatch(loadTracks(selectedFile, eventID))
    }, [dispatch, eventID])


    return (
        tracks.map(track => {
            return <Track key={track.fTrackID} particleName={track.fParticleName} steps={track.fSteps} />
        })
    )

}

export default Event
