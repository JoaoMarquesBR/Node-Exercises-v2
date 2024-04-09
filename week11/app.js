import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();



//data
const streetLights = [
    { streetName: 'Joao', green: 3000, red: 2500, yellow: 3000 },
    { streetName: 'Marques', green: 5000, red: 4000, yellow: 4000 },
    { streetName: 'Info3139', green: 7000, red: 2000, yellow: 3500 },
    { streetName: 'LucasHypee Street', green: 7000, red: 2000, yellow: 3500 },
    // { streetName: 'fourthstreet', green: 13000, red: 7200, yellow: 2800 },
    // { streetName: 'fifthstreet', green: 11500, red: 7600, yellow: 3200 },
    // { streetName: 'sixthstreet', green: 12500, red: 7400, yellow: 2900 },
    // { streetName: 'seventhstreet', green: 10500, red: 7800, yellow: 3800 }
];


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("public"));

let httpServer = http.createServer(app);

app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));
// Socket.io server
const io = new Server(httpServer, {});
// main socket routine
io.on("connection", (socket) => {
    // console.log("new connection established");
    // client has joined
    socket.on("join", (client) => {
        socket.name = client.name;
        console.log("\n\n" + client.name + " client has joined")
    });

    socket.on("hello", (x) => {
        console.log("Received hello request from client.");
        x("hello world")
    });

    socket.on("turnLampOn", (streetName, callBack) => {
        console.log("Received turnLampOn request for:", streetName);

        console.log(streetName)

        const streetFound = streetLights.find(x => x.streetName === streetName);

        if (streetFound) {
            callBack(streetFound)
            console.log("Emitted lamp data:", streetFound);
        } else {
            console.log("No street found for:", streetName);
        }
    });


});
const getNumberOfUsersInRoom = (roomName) =>
    io.sockets.adapter.rooms.get(roomName).size;
app.use((req, res, next) => {
    const error = new Error("No such route found");
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});

httpServer.listen(port, () => {
    console.log(`listening on port ${port}`);
});
