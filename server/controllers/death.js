//controllers
const path = require('path')
const fs = require('fs')

const root = path.join(__dirname, "..", "..")
const dbpath = path.join(root,"db","appointments.json")

// / GET
const showHomeView = (req, res) => {
    res.sendFile(path.join(root, "public", "index.html"))
}

// /appointments POST
const createAppointment = (req, res) => {
    const newAppointmentData = req.body
    console.log(newAppointmentData)
    const appointmentsArray = JSON.parse(fs.readFileSync(dbpath, "utf-8"))
    console.log(appointmentsArray)
    appointmentsArray.push(newAppointmentData)
    console.log(appointmentsArray)
    fs.writeFileSync(dbpath, JSON.stringify(appointmentsArray))
    res.end()
}

module.exports = {showHomeView, createAppointment}
