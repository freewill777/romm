import io from "socket.io-client";

export const socket = io("http://localhost:3000");

export function handleConnect() {
  // Send a message to the server to increment the connected players count
  socket.emit("increment players");
}
