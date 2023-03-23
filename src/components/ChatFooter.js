import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  /**
   * send chat message to server
   * @param {*} e
   */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: `${localStorage.getItem("userName")} : ${message}`,
      });
    }
    setMessage("");
  };
  return (
    <div className='chat__footer'>
      <form className='form' onSubmit={handleSendMessage}>
        <input
          type='text'
          placeholder='Write message'
          className='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='sendBtn'>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
