import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ChatBody = ({ socket, messages, lastMessageRef }) => {
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => setWelcome(data.message));
  }, [socket, welcome]);

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className='chat__mainHeader'>
        <p>{welcome}</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      <div className='message__container'>
        {messages.map((message) => (
          <div className='message__chats' key={message.id}>
            <p>{message.name}</p>
            <div className='message__recipient'>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
