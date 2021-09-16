import jsroot from "jsroot"
const geo = jsroot.require("geom")

const cache = {}

const processFile = async (filepath) => {
    const data = {}
    const treeKey = "EventTree"
    try {
        return jsroot.openFile(filepath)
            .then(file => {
                console.log(`Processing '${filepath}'`)
                file.fKeys.forEach((key) => {
                    console.log("\t" + key.fClassName)
                })
                return file.readObject(treeKey)
            })
            .then(tree => {
                let count = 0
                let selector = new jsroot.TSelector()

                selector.addBranch("fEvent")

                selector.Process = function () {
                    count++
                    const event = this.tgtobj.fEvent
                    const eventID = event.fEventID

                    const tracks = []
                    event.fTracks.forEach(track => {
                        const steps = []
                        for (let i = 0; i < track.fSteps.fN; i++) {
                            steps.push({
                                "fX": track.fSteps.fPosition[i].fX,
                                "fY": track.fSteps.fPosition[i].fY,
                                "fZ": track.fSteps.fPosition[i].fZ,
                                "fEnergy": track.fSteps.fEnergy[i],
                                "fTimeGlobal": track.fSteps.fTimeGlobal[i],
                                "fTrackKineticEnergy": track.fSteps.fTrackKineticEnergy[i],
                                "fVolumeName": track.fSteps.fVolumeName[i],
                                "fProcessName": track.fSteps.fProcessName[i],
                            })
                        }
                        tracks.push({
                            "fTrackID": track.fTrackID,
                            "fParticleName": track.fParticleName,
                            "fSteps": steps,
                        })
                    })
                    data[eventID] = tracks
                }

                selector.Terminate = function (res) {
                    if (!res || (count === 0)) {
                        res = "Failed to process TTree"
                        return
                    }
                    cache[filepath] = data
                }

                return new Promise((resolve, reject) => {
                    tree.Process(selector).then(() => resolve(data))
                })
            })

    } catch (error) {
        console.log("ERROR!")
        return "ERROR"
    }
}

export const getEventFromFile = async (filepath, eventIndex = undefined, eventID = undefined) => {
    console.log('getEventFromFile', filepath, eventIndex, eventID)

    if (eventIndex && eventID) {
        console.log("cannot set eventIndex and eventID at the same time")
        return
    }
    if (!eventIndex && !eventID) {
        eventIndex = 0
    }

    console.log('getEventFromFile', filepath, eventIndex, eventID)


    if (!cache[filepath]) {
        console.log(`file '${filepath}' not in cache, processing...`)
        await processFile(filepath)
    }

    const events = cache[filepath]
    if (!eventID) {
        eventID = Object.keys(events)[eventIndex]
    } else {
        if (!eventID in Object.keys(events)) {
            console.log(`eventID ${eventID} is not a valid event ID (${Object.keys(events)})`)
            return
        }
    }

    if (!eventID) {
        // out of range
        console.log(`event index ${eventIndex} with ID ${eventID} not found, probably out of range (${Object.keys(events)})`)
    }
    return events[eventID]
}

export const getAvailableEventIDsFromFile = async (filepath) => {
    console.log('getAvailableEventIDsFromFile', filepath)

    if (!cache[filepath]) {
        console.log(`file '${filepath}' not in cache, processing...`)
        await processFile(filepath)
    }

    const events = cache[filepath]

    const eventIDs = Object.keys(events).map(id => parseInt(id))

    return eventIDs
}

const buildGeometry = (obj) => {
    console.log("Starting to export geometry: ", obj)

    const opt = { numfaces: 100000, numnodes: 1000, wireframe: false, dflt_colors: true }

    const volumes = obj.fMasterVolume.fNodes.arr
    const top_volumes_names = []
    for (var i in volumes) {
        const name = volumes[i].fName
        top_volumes_names.push(name)
        console.log(i, name)
    }
    return jsroot.GEO.build(obj, opt);
}

export const getGeometryFromFile = (filename) => {
    return jsroot.openFile(filename)
        .then(file => {
            const geometries = []
            file.fKeys.forEach((key) => {
                if (key.fClassName === "TGeoManager") {
                    geometries.push(key)
                }
            })

            if (geometries.length === 0) {
                console.log("No geometries in file, returning")
                return
            }

            console.log("geometries in file: ", geometries)
            const keyName = geometries[0].fName
            return file.readObject(keyName)
        })
        .then(obj => buildGeometry(obj)).catch(err => console.log(err))
}