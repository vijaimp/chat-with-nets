import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import socketIO from "socket.io-client"

const Login = ({ getSocket }) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [chatServerAddress, setChatServerAddress] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const socket = socketIO.connect(chatServerAddress)
        localStorage.setItem("userName", userName)
        try {
          socket.emit("newUser", {userName, socketID: socket.id})
          getSocket(socket)
          navigate("/chat")
        } catch (err) {
          console.log(err);
        }
    }
  return (
    <form className='home__container' onSubmit={handleSubmit}>
        <h2 className='home__header'>Sign in to Open Chat</h2>
        <label htmlFor="username">Username</label>
        <input type="text" 
        minLength={10} 
        name="username" 
        id='username'
        className='username__input' 
        value={userName} 
        onChange={e => setUserName(e.target.value)}
        />
        <label htmlFor="server">Chat Server address</label>
        <input type="text" 
        minLength={10} 
        name="chatServerAddress" 
        id='chatServerAddress'
        className='username__input' 
        value={chatServerAddress} 
        onChange={e => setChatServerAddress(e.target.value)}
        />
        <button className='home__cta'>Login</button>
    </form>
  )
}

export default Login