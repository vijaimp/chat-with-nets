import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";

const Login = ({ getSocket }) => {
  const navigate = useNavigate();
  // TODO: below hardcoded values to be removed once tested
  const [userName, setUserName] = useState("Test user");
  const [chatServerAddress, setChatServerAddress] = useState(
    "http://localhost:4000/"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let location = {};
    try {
      const position = await getLocation();
      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (err) {
      console.log(err);
    }
    const socket = socketIO.connect(chatServerAddress);
    localStorage.setItem("userName", userName);
    socket.emit("login", {
      userName,
      location: location,
      socketID: socket.id,
    });
    getSocket(socket);
    navigate("/chat");
  };

  const getLocation = async () => {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  };

  return (
    <form className='home__container' onSubmit={handleSubmit}>
      <h2 className='home__header'>Sign in to Open Chat</h2>
      <label htmlFor='server'>Chat Server address</label>
      <input
        type='text'
        minLength={10}
        name='chatServerAddress'
        id='chatServerAddress'
        className='chat_address__input'
        value={chatServerAddress}
        onChange={(e) => setChatServerAddress(e.target.value)}
      />
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        minLength={5}
        name='username'
        id='username'
        className='username__input'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className='home__cta'>Submit</button>
    </form>
  );
};

export default Login;
