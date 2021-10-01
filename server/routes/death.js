//routes
const express = require("express")
const deathControllers = require("../controllers/death")

const router = express.Router()

router.get("/", deathControllers.showHomeView)

router.get("/appointments", deathControllers.readAppointments)
router.post("/appointments", deathControllers.createAppointment)
router.put("/appointments", deathControllers.updateAppointment)
router.delete("/appointments", deathControllers.deleteAppointment)


module.exports = router
