import io from "socket.io-client";

export const socket = io("http://192.168.0.17:3000");

export function handleConnect() {
  socket.emit("increment players");
}
