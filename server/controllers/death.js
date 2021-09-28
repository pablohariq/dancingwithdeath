//controllers
const path = require('path')

const root = path.join(__dirname, "..", "..")

// / GET
const showHomeView = (req, res) => {
    res.sendFile(path.join(root, "public", "index.html"))
}

module.exports = {showHomeView}
