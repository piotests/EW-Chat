const { getAllRooms } = require('./rooms');

var uuid = require('uuid');

const messages = [];

const addMessage = ( room, message ) => {
  const getRooms = getAllRooms()
  const existingRoom = getRooms.find( ( chat ) => chat.room === room );

  if ( !existingRoom ) {
    return { error: "invalid Room." };
  }
  
  const msg = { id: uuid.v4(), room, ...message };
  messages.push( msg );
  return msg;
};

const removeMessage = ( id ) => {
  const index = messages.findIndex( ( message ) => message.id === id );

  if ( -1 !== index ) {
    return messages.splice( index, 1 )[0];
  }
};

const getMessage = ( id ) => messages.find( ( message ) => message.id === id );

const getMessagesInRoom = ( room ) => messages.filter( ( message ) => message.room === room );

module.exports = { addMessage, removeMessage, getMessage, getMessagesInRoom };