import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import useWindowSize from './Utils/useWindowSize';
import './Chat.scss';
import ChatList from './ChatList/ChatList';
import ChatRoom from './ChatRoom/ChatRoom';

const Chat = () => {

    const [width] = useWindowSize();
    const display = width < 993 ? 'hide-sm hide-xs' : '';

    const getRoomId = localStorage.getItem('room') || '';

    const [roomId, setRoomId] = useState(getRoomId);
    const [roomImage, setRoomImage] = useState('');
    const [selectedChatView, setSelectedChatView] = useState(false);

    const handleSetselectedRoomId = (roomId, roomImage) => {
        setRoomId(roomId);
        setRoomImage(roomImage);
        setSelectedChatView(true);
        localStorage.setItem('room', roomId);
    };

    const handleSelectedChatView = () => {
        setSelectedChatView(false);
    };


    return (
        <div className='main-container'>
            <ChatList handleSetselectedRoomId={handleSetselectedRoomId} display={selectedChatView ? display : ''} />
            <ChatRoom roomId={roomId} roomImage={roomImage} handleSelectedChatView={handleSelectedChatView} display={!selectedChatView ? display : ''} />
        </div>
    );
};

export default withRouter(Chat);