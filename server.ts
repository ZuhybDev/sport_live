import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket, request) => {
    const ip = request.socket.remoteAddress;
    console.log(`New connection from ${ip}`);


    // Listen to messages from this particular socket
    socket.on("message", (rawData) => {
        const msg = rawData.toString();
        console.log(`Received: ${msg}`);

        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(`Server Broadcast: ${msg}`);
            }
        });
    });

    socket.on("error", (err) => {
        console.error("Error: ", err);
    });

    socket.on("close", () => {
        console.log("Connection Closed");
    });
});

console.log("Server is running at PORT:", PORT);