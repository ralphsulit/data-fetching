import React, { useState, useEffect } from 'react';
import Home from './Home';
import axios from 'axios';

function DataFetching() {
  const [email, setEmail] = useState(''); //Email
  const [password, setPassword] = useState(''); // Password
  const [error, setError] = useState(''); //Error
  const [sendMessage, setSendMessage] = useState(''); //Send Message
  // const [headers, setHeaders] = useState({
  //   'access-token': '',
  //   'client': '',
  //   'expiry': 0,
  //   'uid': ''
  // });

  //Register Button
  const handleRegister = () => {
    axios
      .post('http://206.189.91.54//api/v1/auth/',
        {
          "email": email,
          "password": password,
          "password_confirmation": password
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(`email taken`);
      });
  };

  //Login Button
  const handleLogin = async () => {
    try {
      const resp = await axios.post(
        'http://206.189.91.54//api/v1/auth/sign_in',
        {
          "email": email,
          "password": password,
        }).then((res) => {
          // setAccessToken(res.headers['access-token']);
          // console.log(accessToken);
          localStorage.setItem('access-token', res.headers['access-token']);
          localStorage.setItem('client', res.headers['client']);
          localStorage.setItem('expiry', res.headers['expiry']);
          localStorage.setItem('uid', res.headers['uid']);
          console.log(res);
        }
        )
        console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   setAxiosHeaders(headers);
  // }, [headers]);

  //Send Message 
  const handleMessage = () => {
    const headers = {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'uid': localStorage.getItem('uid'),
    }
    axios
    .post('http://206.189.91.54//api/v1/messages',
      {
        "receiver_id": 1,
        "receiver_class": "User",
        "body": "kamusta?"
      },
      {headers}
      )
      .then(res => {
        console.log('body');
      }).catch(err => {
        console.log(err);
      });
  };

  //Get Email value
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  //Get Password Value
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  //Get Message 
  const handleGetMessage = (e) => {
    setSendMessage(e.target.value);
  };

  return (
    <div>
      <input type='email' placeholder='email' onChange={handleEmail}  />
      <input type='password' placeholder='password' onChange={handlePass}  />
      <button onClick={handleRegister}>Register</button> <br/><br/>
      
      <input type='email' placeholder='email' onChange={handleEmail}  />
      <input type='password' placeholder='password' onChange={handlePass}  />
      <button onClick={handleLogin}>Login</button><br/><br/>
      
      <textarea placeholder='message' onChange={handleGetMessage} rows='4' cols='50' />
      <button onClick={handleMessage}>Send</button>
    </div>
  )
};

export default DataFetching;
