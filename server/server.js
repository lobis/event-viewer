const jsroot = require("jsroot")
//
const fs = require("fs")
const path = require("path")

// filepath as a command line argument
console.log(process.argv)
const filepath = process.argv[2]
console.log("Processing ROOT file: " + filepath)

const geometryKey = "Geometry"
const treeKey = "EventTree"

const output = {}

jsroot.openFile(filepath)
    .then(file => {
        console.log("Keys in file:")
        file.fKeys.forEach((key) => {
            console.log("\t" + key.fClassName)
        })
        return file.readObject(treeKey)
    })
    .then(tree => {
        console.log("Number of branches in TTree: " + tree.GetNumBranches())
        //console.log(tree)
        console.log("Name of all leaves:")
        tree.fLeaves.arr.forEach(leaf => console.log("\t" + leaf.fName))

        let count = 0
        let selector = new jsroot.TSelector()
        selector.addBranch("fEvent")
        selector.Process = function () {
            count++
            const event = this.tgtobj.fEvent
            const eventID = event.fEventID

            if (count > 1) {
                //return
            }

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
            output[eventID] = tracks

            //console.log(event.fTracks)
        }

        selector.Terminate = function (res) {
            if (!res || (count === 0)) {
                res = "Failed to process TTree"
                return
            }

            console.log("DONE!")
            //console.log(output)

            try {
                fs.writeFileSync("events.json", JSON.stringify(output, null, 2))
            } catch (err) {
                console.error(err)
            }
        }

        tree.Process(selector)
    })


