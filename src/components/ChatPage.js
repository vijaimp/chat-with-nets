import React, { useEffect, useState} from 'react'

const ChatPage = ({socket}) => { 
  const [messages, setMessages] = useState([])
  console.log(socket);
  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  return (
    <div>
    </div>
  )
}

export default ChatPage