import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {SOCKET_SERVER_URL} from '../../Config/Config';
import LocalStorage from '../Helpers/LocalStorage';
import './ChatList.scss';
import ChatListImage from './ChatListImage/ChatListImage';
import ChatListBody from './ChatListBody/ChatListBody';

const ChatList = ({
    handleSetselectedRoomId, 
    display
}) => {
    const [chatsList, setchatsList] = useState([]);
    const user = LocalStorage.getItem('user', '');

    useEffect(() => {
        const fetchAllChats = async () => {
            const response = await axios.get(
                `${SOCKET_SERVER_URL}/chats`
            );
            const result = response.data.rooms;
            setchatsList(result);
        };

        fetchAllChats();
    },[]);

    return (
        <section className={`cl-container ${display}`}>
            <div className='cl-item center'>
                <p>Welcome <span className='capitalize'>{user.name}</span> #{user.roomNumber} )</p>
            </div>
            {chatsList.map( (chat) => (
                <div className='cl-item' key={chat.id} onClick={() => handleSetselectedRoomId(chat.room, chat.image)}>
                    <ChatListImage chat={chat}></ChatListImage>
                    <ChatListBody chat={chat}></ChatListBody>
                </div>
            ))}
        </section>
    );
};

export default ChatList;
