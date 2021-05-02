const users = [];

const addUser = ( id, room, name, picture, roomNumber, action ) => {

  if ( 'login' !== action && ( !name || !room ) ) {
    return { error: "Username and room are required." };
  } 

  if ( !name ) {
    return { error: 'Username are required.' };
  } 
  
  const existingUser = users.find( ( user ) => user.name === name );
  const existingUserInRoom = users.find( ( user ) => user.room === room && user.name === name );

  if ( existingUser && !existingUserInRoom ) {
    userIndex = users.findIndex( ( user ) => user.name === name );
    users[userIndex].id = id;
    users[userIndex].room = room;

    return { id, name: users[userIndex].name, picture: users[userIndex].picture, roomNumber: users[userIndex].roomNumber };
  }

  if ( existingUser ) {
    return { error: "Username is taken." };
  }

  const user = { id, room, name, picture, roomNumber };

  users.push( user );

  return { id, name: user.name, picture: user.picture, roomNumber: user.roomNumber };

};

const removeUser = ( id ) => {
  const index = users.findIndex( ( user ) => user.id === id );

  if ( -1 !== index ) { 
    return users.splice( index, 1 )[0];
  }
};

const getUser = ( id ) => users.find( ( user ) => user.id === id );

const getUserByRoomNumber = ( roomNumber ) => users.find( ( user ) => user.roomNumber === roomNumber );

const getUsersInRoom = ( room ) => users.filter( ( user ) => user.room === room );

module.exports = { addUser, removeUser, getUser, getUserByRoomNumber, getUsersInRoom };