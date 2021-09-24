const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())

const rutaRaiz = path.join(__dirname, "..")

console.log(rutaRaiz)

app.get("/", (req, res) => {
    res.sendFile(path.join(rutaRaiz,"public","index.html"))
})

app.listen(3000, () => console.log("Servidor iniciado en puerto 3000"))