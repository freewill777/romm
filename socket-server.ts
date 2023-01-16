'use strict';

import * as http from "http";
import { Server, Socket } from "socket.io";


const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const ipv4Addresses = Object.create(null);

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      if (!ipv4Addresses[name]) {
        ipv4Addresses[name] = [];
      }
      ipv4Addresses[name].push(net.address);
    }
  }
}

console.log(ipv4Addresses)

const server: http.Server = http.createServer();
const io: Server = new Server(server, {
  cors: {
    origin: "*",
  },
});

const randomId = () => Math.random().toString(36).substring(2, 10);


interface message {
  id: string;
  text: string,
  user: any,
  time: string,
};

interface Room {
  id: string;
  name: string;
  messages: message[];
}

interface User {
  id: string;
  name: string;
}

let chatRooms: Room[] = [
  {
    id: '12345', name: 'Griffindor', messages: [{
      id: '1',
      text: 'sa mi o iei',
      user: 'haules',
      time: 'baules',
    }]
  },
  {
    id: '666', name: 'Da hood', messages: [{
      id: '1',
      text: 'ave',
      user: 'haules',
      time: 'baules',
    }]
  },
  {
    id: '66', name: 'hood', messages: [{
      id: '1',
      text: 'ave',
      user: 'haules',
      time: 'baules',
    }]
  }
]

let users: User[] = []


io.on("connection", (socket: Socket) => {
  console.log(`User ${socket.id} connected`);

  users.push({
    id: socket.id,
    name: Math.random().toString(36).substring(2, 7)
  })

  socket.emit('userList', users)

  setTimeout(() => {
    io.emit("chatMsg", 'hi snitchez@' + Date.now());
  }, 2000)

  socket.on('createRoom', (name) => {
    Object
    socket.emit('roomsList', chatRooms)
  })

  socket.on('findRoom', (id) => {
    let result = chatRooms.filter((room) => room.id == id)
    socket.emit('foundRoom', result[0].messages)
  })

  socket.on("newMessage", (data) => {
    const { room_id, message, user, timestamp } = data;
    let result: Room[] = chatRooms.filter((room) => room.id == room_id);
    const newMessage = {
      id: randomId(),
      text: message,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    console.log("New Message", newMessage);
    socket.to(result[0].name).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on('getRoomsList', () => {
    socket.emit("roomsList", chatRooms);
  })

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
