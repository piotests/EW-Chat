import React from 'react';
// import "./MessageForm.scss";

const MessageForm = ({
  newMessage,
  handleMessageChange,
  handleSendMessage,
}) => {
  return (
    <form className='cbc-message'>
        <input 
          type='text' 
          value={newMessage} 
          placeholder='Please enter message' 
          onChange={handleMessageChange} 
        />
        <button 
          type='submit' 
          disabled={!newMessage}
          onClick={handleSendMessage}
        >
          Send
        </button>
    </form>
  );
};

export default MessageForm;
