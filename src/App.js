import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import ChatPage from "./components/ChatPage";
import React, { useState} from 'react'

function App() {
  const [socket, setSocket] = useState();
  const getSocket = (socket) => {
    setSocket(socket);
  };

  return (
    <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login getSocket={getSocket}/>}></Route>
            <Route path="/chat" element={<ChatPage socket={socket}/>}></Route>
          </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
