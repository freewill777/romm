import * as http from "http";
import * as socketIo from "socket.io";
import { Server, Socket } from "socket.io";

const server: http.Server = http.createServer();
const io: Server = new Server(server, {
  cors: {
    origin: "*",
  },
});

let numConnectedPlayers: number = 0;

io.on("connection", (socket: Socket) => {
  numConnectedPlayers++;
  io.emit("players", numConnectedPlayers);
  console.log(`Player ${socket.id} connected`);
  socket.on("disconnect", () => {
    numConnectedPlayers--;
    io.emit("players", numConnectedPlayers);
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
