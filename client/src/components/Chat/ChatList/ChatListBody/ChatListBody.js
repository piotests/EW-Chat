import React from 'react';
// import "./ChatListBody.scss";

const ChatListBody = ({ chat }) => {
  return (
    <div className='cl-body'>
        <div className='cl-body-top'>
            <div className='cl-body-top-title'>{chat.room}</div>
            <div className='cl-body-top-time'></div>
        </div>
        <div className='cl-body-bottom'>
            <div className='cl-body-bottom-title'>{chat.description}</div>
            {/* <div className='cl-body-bottom-status'><span>1</span></div> */}
        </div>
    </div>
    );
};

export default ChatListBody;
