//controllers
const path = require('path')
const fs = require('fs')
const { randomUUID } = require('crypto')
const moment = require("moment")

const root = path.join(__dirname, "..", "..")
const dbpath = path.join(root,"db","appointments.json")

// / GET
const showHomeView = (req, res) => {
    res.sendFile(path.join(root, "public", "index.html"))
}

// /appointments GET
const readAppointments = (req, res) => {
    const {id} = req.query
    const appointmentsArray = JSON.parse(fs.readFileSync(dbpath, "utf-8"))
    if (id){ //if query string is passed return only the matching id appointment
        const requestedAppointmentById = appointmentsArray.find(a => a.id == id)
        if (requestedAppointmentById){
            res.status(200).send(requestedAppointmentById)
        }
        else{
            res.status(400).end()
        }
    }
    else{ //else return all appointments
        res.send(JSON.stringify(appointmentsArray))
    }
}

// /appointments POST
const createAppointment = (req, res) => {
    const newAppointmentData = req.body
    const {date, startTime} = newAppointmentData
    const momentAppt = moment(`${date} ${startTime}:00`)
    
    //week day validation
    const dayOfWeek = momentAppt.format("ddd")
    if (dayOfWeek == "Sat" || dayOfWeek == "Sun"){
        return res.status(400).send({message: "Appointments with Death can only be made during business days (Mon-Fri)."})
    }

    const endTime = momentAppt.add(1,'hours').format("HH:mm") 

    newAppointmentData.endTime = endTime //endTime of appointment calculated as 1 hour before the start time
    newAppointmentData.id = randomUUID().slice(0,5) //unique id for each appointment
    const appointmentsArray = JSON.parse(fs.readFileSync(dbpath, "utf-8"))
    appointmentsArray.push(newAppointmentData)
    fs.writeFileSync(dbpath, JSON.stringify(appointmentsArray))
    res.end()
}

// /appointments PUT
const updateAppointment = (req, res) => {
    const {id} = req.query
    const updatedAppointmentData = req.body
    const {date, startTime} = updatedAppointmentData
    console.log(updatedAppointmentData)
    const momentAppt = moment(`${date} ${startTime}:00`)

    //update endTime and write id
    const endTime = momentAppt.add(1,'hours').format("HH:mm") 
    updatedAppointmentData.endTime = endTime
    // updatedAppointmentData.id = id //unnecesary since is sent in body

    const appointmentsArray = JSON.parse(fs.readFileSync(dbpath, "utf-8"))
    const index = appointmentsArray.findIndex(a => a.id == id)
    appointmentsArray[index] = updatedAppointmentData
    fs.writeFileSync(dbpath, JSON.stringify(appointmentsArray))
    res.end()
}

// / appointments DELETE
const deleteAppointment = (req, res) => {
    const {id} = req.query
    const appointmentsArray = JSON.parse(fs.readFileSync(dbpath, "utf-8"))
    const index = appointmentsArray.findIndex(a => a.id == id)
    appointmentsArray.splice(index, 1)
    fs.writeFileSync(dbpath, JSON.stringify(appointmentsArray))
    res.status(200).end()
}
module.exports = {showHomeView, createAppointment, readAppointments, updateAppointment, deleteAppointment}
