const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes/death')

app.use(express.json())
app.use("/", routes)

const root = path.join(__dirname, "..")

//public paths
app.use("/css", express.static(path.join(root, "public", "css")))
app.use("/js", express.static(path.join(root, "public", "js")))
app.use("/sweetalert", express.static(path.join(root, "node_modules", "sweetalert2", "dist")))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Server up in port 3000"))