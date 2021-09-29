//routes
const express = require("express")
const deathControllers = require("../controllers/death")

const router = express.Router()

router.get("/", deathControllers.showHomeView)

router.post("/appointments", deathControllers.createAppointment)


module.exports = router
