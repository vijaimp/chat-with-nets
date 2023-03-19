import React, { useEffect, useState, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='chat'>
      <div className='chat__main'>
        <ChatBody
          socket={socket}
          messages={messages}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
