//routes
const express = require("express")
const deathControllers = require("../controllers/death")

const router = express.Router()

router.get("/", deathControllers.showHomeView)

module.exports = router
