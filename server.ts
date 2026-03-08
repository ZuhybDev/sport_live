import { WebSocketServer } from "ws";
const PORT = 8080
const wss = new WebSocketServer({port: PORT})

wss.on("connection", (socket, request) => {

    const ip = request.socket.remoteAddress
    
    wss.on("message", (rawData) => {
        const msg = rawData.toString()

        console.log(msg)

        wss.clients.forEach((client) => {
            if(client.readyState == socket.OPEN) client.send(`Server Broadcast ${msg}`)
        })
    })

    socket.on('error', (err) => {
        console.error("Error: ", err)
    })

    socket.on('close', () => {
        console.log("Connection Closed")
    })
})

console.log("Server is running at PORT: ", PORT)