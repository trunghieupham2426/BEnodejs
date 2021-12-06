import React, { Component, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Signin = (props) => {
  let iniState = {
    email: '',
    password: '',
  };
  const [state, setState] = useState(iniState);
  const dispatch = useDispatch();
  const login = (e) => {
    e.preventDefault();
    let data = {
      email: state.email,
      password: state.password,
    };
    axios
      .post('http://127.0.0.1:8000/api/v1/user/login', data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 'success') {
          let userData = {
            auth_token: res.data.token,
            auth: res.data.data,
          };
          let appState = {
            user: userData,
          };
          // save cookie
          document.cookie = 'jwt=' + res.data.token;

          localStorage.setItem('appState', JSON.stringify(appState));
          dispatch({ type: 'LOGGED_IN' });
          props.history.push('/');
        }
      })
      .catch((err) => alert(err.response.data.message));
  };
  const onChange = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [nameInput]: value,
    }));
  };
  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        <h2>Login to your account</h2>
        <form action="#">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />

          <span>
            <input type="checkbox" className="checkbox" />
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default" onClick={login}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
