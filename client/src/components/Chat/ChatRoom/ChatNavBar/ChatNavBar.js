import React from 'react';
// import "./ChatNavBar.scss";

const ChatNavBar = ({
  handleSelectedChatView,
  roomImage,
  roomId,
}) => {
  return (
    <div className='cbc-navbar'>
        <div className='cbc-navbar-item cbc-navbar-item__left'>
            <div className='hide-lg hide-md'>
                <p className='navBarText' onClick={() => handleSelectedChatView()}>
                    <i className='arrow left'></i>
                </p>
            </div>
            <div className='cbc-avatar-container'>
                <img alt='logo' src={roomImage} className='cbc-avatar' />
            </div>
            <p className='navBarText'>{roomId}</p>
        </div>
    </div>
  );
};

export default ChatNavBar;
