require("dotenv").config()

const net = require("net")
const express = require("express")
const { send } = require("process")
const { write } = require("fs")

const app = express()
const port = process.env.BACKEND_PORT || 4000

//Start server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

//Api functions
app.get("/", function(req, res){
    res.send("DollyBot")
})

app.get("/test/:test", function(req, res){
    console.log(req.params.test)
    sendNotification(req.params.test)
})



//Communication with python
const client = new net.Socket()

client.on("error", (err) => {
    console.log(`An error occured: ${err}`)
})

function sendNotification(msg) {
    const botIp = process.env.BOT_ADDRESS || "localhost"
    const botPort = process.env.BOT_PORT || 12345
   
    client.connect(botPort, botIp, () => {
        console.log(`Connected to ${botIp}:${botPort}`)
        client.write(msg)
        client.destroy()
    })
}