import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ChatBody = ({ socket, messages, lastMessageRef }) => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState();
  /**
   * receive greeting message from server
   */
  useEffect(() => {
    socket.on("message", (data) => setGreeting(data.message));
  }, [socket, greeting]);

  /**
   * leave the chat and clear localstorage
   */
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  /**
   *
   * @param {*} props
   * @returns greeting message if connection successful with server or show error if connection fails
   */
  const Greeting = (props) => {
    return props.connected && greeting
      ? greeting
      : "Still connecting...if takes time Leave the chat and join with valid server address";
  };

  return (
    <>
      <header className='chat__mainHeader'>
        <p>
          <Greeting connected={socket.connected} />
        </p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      <div className='message__container'>
        {messages.map((message, index) => {
          return (
            <div className='message__chats' key={index}>
              <p>{message.name}</p>
              <div className='message__recipient'>
                <p>{message.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
