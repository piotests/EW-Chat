const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
const { addUser, removeUser, getUsersInRoom, getUserByRoomNumber } = require('./models/users');
const { getAllRooms } = require('./models/rooms');
const { addMessage, getMessagesInRoom } = require('./models/messages');

const app = express();
app.use( cors() );

const server = http.createServer( app );
const io = socketIo( server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = 8002;
const USER_JOIN_CHAT_EVENT = 'USER_JOIN_CHAT_EVENT';
const USER_LEAVE_CHAT_EVENT = 'USER_LEAVE_CHAT_EVENT';
const NEW_CHAT_MESSAGE_EVENT = 'NEW_CHAT_MESSAGE_EVENT';

io.on( 'connection', ( socket ) => {
  console.log(`${socket.id} connected`);

  // Join a conversation
  const { roomId, name, picture, roomNumber, action } = socket.handshake.query;
  socket.join(roomId);

  const user = addUser( socket.id, roomId, name, picture, roomNumber, action );
  io.in( roomId ).emit( USER_JOIN_CHAT_EVENT, user );

  // Listen for new messages
  socket.on( NEW_CHAT_MESSAGE_EVENT, ( data ) => {
    const message = addMessage( roomId, data, user );
    io.in( roomId ).emit( NEW_CHAT_MESSAGE_EVENT, message );
  });

  // Leave the room if the user closes the socket
  socket.on( 'disconnect', () => {
    removeUser( socket.id );
    io.in( roomId ).emit( USER_LEAVE_CHAT_EVENT, user );
    socket.leave( roomId );
  });
});

server.listen( PORT, () => {
  console.log( `Listening on port ${PORT}` );
});

app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.get( '/chats/:roomId/users', ( req, res ) => {
  const users = getUsersInRoom( req.params.roomId );
  return res.json({ users });
});

app.get( '/chats/:roomId/messages', ( req, res ) => {
  const messages = getMessagesInRoom( req.params.roomId );
  return res.json({ messages });
});

app.get( '/chats', ( req, res ) => {
  const rooms = getAllRooms();
  return res.json({ rooms });
});

app.post( '/users/create', ( req, res ) => {
  const request = req.body;
  const user = addUser( request.id, request.room, request.name, request.picture, request.roomNumber, 'login' );
  if (user.error) {
    return res.json( user ).status( 200 );
  }
  const userData = getUserByRoomNumber( user.roomNumber );
  return res.json( userData ).status( 200 );
});