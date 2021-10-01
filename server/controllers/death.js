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
    const appointmentsArray = JSON.parse(fs.readFileSync(dbpath, "utf-8"))
    console.log(appointmentsArray)
    res.send(JSON.stringify(appointmentsArray))

}

// /appointments POST
const createAppointment = (req, res) => {
    const newAppointmentData = req.body
    const {date, startTime} = newAppointmentData
    console.log(`${date} ${startTime}`)
    const momentAppt = moment(`${date} ${startTime}:00`)
    const endTime = momentAppt.add(1,'hours').format("HH:mm") 

    newAppointmentData.endTime = endTime //endTime of appointment calculated as 1 hour before the start time
    newAppointmentData.id = randomUUID().slice(0,5) //unique id for each appointment
    const appointmentsArray = JSON.parse(fs.readFileSync(dbpath, "utf-8"))
    appointmentsArray.push(newAppointmentData)
    fs.writeFileSync(dbpath, JSON.stringify(appointmentsArray))
    res.end()
}

module.exports = {showHomeView, createAppointment, readAppointments}
