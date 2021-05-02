import React, {useState} from 'react';
import useChat from '../Utils/useChat';
import './ChatRoom.scss';
import ChatNavBar from './ChatNavBar/ChatNavBar';
import ChatMessage from './ChatMassage/ChatMassage';
import MessageForm from './MessageForm/MessageForm';
import LocalStorage from '../Helpers/LocalStorage';

const ChatRoom = ({
    roomId, 
    roomImage, 
    handleSelectedChatView, 
    display
}) => {
    const {
        messages,
        sendMessage,
        listRef,
    } = useChat(roomId);

    const [newMessage, setNewMessage] = useState('');
    const user = LocalStorage.getItem('user', 'name');

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(newMessage);
        setNewMessage('');
    };
    

    return (
        <section className={`cbc-container ${display}`}>
            {!roomId ?
                <>
                    <div className='cbc-welcome-warpper'>
                        <div className='cbc-welcome-item'>
                            <h1>Hello, {user}!</h1>
                            <p>Select a group to start a chat.</p>
                        </div>
                    </div>
                </> 
                :
                <>
                    <ChatNavBar
                        handleSelectedChatView={handleSelectedChatView}
                        roomImage={roomImage}
                        roomId={roomId}
                    ></ChatNavBar>

                    <div className='cbc-container-mlist message-list' ref={listRef}>
                        <div className='cbc-mlist'>
                            {messages.map((message, i) => (
                                <div className='cbc-container-mbox message' key={i}>
                                    <ChatMessage message={message}></ChatMessage>
                                </div>
                            ))}
                        </div>
                    </div>
                    <MessageForm
                        newMessage={newMessage}
                        handleMessageChange={handleMessageChange}
                        handleSendMessage={handleSendMessage}
                    ></MessageForm>
                </>
            }
        </section>
    );
};

export default ChatRoom;
