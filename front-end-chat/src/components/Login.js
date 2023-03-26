import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";

const Login = ({ getSocket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [chatServerAddress, setChatServerAddress] = useState("");
  const [validUrl, setValidUrl] = useState(false);

  /**
   * connect socket and send login message to the chat server
   * @param {*} e
   */
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
    const socket = await socketIO.connect(chatServerAddress);
    localStorage.setItem("userName", userName);
    await socket.emit("login", {
      userName,
      location: location,
      socketID: socket.id,
    });
    getSocket(socket);
    navigate("/chat");
  };

  /**
   *
   * @returns position promise or error
   */
  const getLocation = async () => {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  };

  /**
   *
   * @param {*} URL
   * @returns true if url is valid
   */
  const urlPatternValidation = (URL) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
  };

  /**
   * set url validation flag and set the chat address
   * @param {*} e
   */
  const changeUrl = (e) => {
    const { value } = e.target;
    const validUrl = urlPatternValidation(value) || value.includes("localhost");
    setValidUrl(validUrl);
    setChatServerAddress(e.target.value);
  };

  return (
    <form className='home__container' onSubmit={handleSubmit}>
      <h2 className='home__header'>Sign in to Open Chat</h2>
      <label htmlFor='server'>Chat Server address</label>
      <input
        type='text'
        name='chatServerAddress'
        id='chatServerAddress'
        className='chat_address__input'
        value={chatServerAddress}
        onChange={changeUrl}
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
      <button className='home__cta' disabled={!validUrl}>
        Submit
      </button>
    </form>
  );
};

export default Login;
