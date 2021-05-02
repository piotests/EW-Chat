import React from 'react';
// import "./ChatListImage.scss";

const ChatListImage = ({ chat }) => {
  return (
    <div className='cl-avatar'>
        <div className='cl-warper-img'>
            <img 
                className='chat-list-img' 
                alt={chat.roomName} 
                src={chat.image} 
            />
        </div>
    </div>
  );
};

export default ChatListImage;
