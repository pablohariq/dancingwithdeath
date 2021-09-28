const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes/death')

app.use(express.json())
app.use("/", routes)

const root = path.join(__dirname, "..")

//public paths
app.use("/css", express.static(path.join(root, "public", "css")))


app.listen(3000, () => console.log("Server up in port 3000"))