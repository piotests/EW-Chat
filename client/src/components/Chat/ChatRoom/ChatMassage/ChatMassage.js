import React from 'react';
import dateFormat from '../../Helpers/dateFormat';
import LocalStorage from '../../Helpers/LocalStorage';

// import './ChatMessage.css';

const ChatMessage = ({ message }) => {
      
    const dateTime = dateFormat(message.createdAt);
    const user = LocalStorage.getItem('user', 'name');
    const currentUser = message.user.name == user; //message.ownedByCurrentUser

    return (
        <div className={`cbc-mbox ${ currentUser ? 'rce-mbox-right' : ''}`}>
            <div className='cbc-mbox-body'>
                {!currentUser && (
                    <div className='cbc-mbox-text cbc-mbox-user'>{message.user.name}</div>
                )}
                <div className='cbc-mbox-text'>{message.body}</div>
                <div className='cbc-mbox-time non-copiable' data-text={dateTime}></div>
            </div>
            {currentUser ? (
                <svg className='cbc-mbox-right-notch' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M0 0v20L20 0'></path></svg>
            ) : (
                <svg className='cbc-mbox-left-notch' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><defs><filter id='filter1' x='0' y='0'><feOffset result='offOut' in='SourceAlpha' dx='-2' dy='-5'></feOffset><feGaussianBlur result='blurOut' in='offOut' stdDeviation='3'></feGaussianBlur><feBlend in='SourceGraphic' in2='blurOut' mode='normal'></feBlend></filter></defs><path d='M20 0v20L0 0' filter='url(#filter1)'></path></svg>
            )}
        </div>
    );
};

export default ChatMessage;
