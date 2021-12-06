import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserUpdate = () => {
  let iniState = {
    user: '',
    token: '',
  };
  const [state, setState] = useState(iniState);

  useEffect(() => {
    let userData = localStorage.getItem('appState');
    userData = JSON.parse(userData);
    setState((preState) => ({
      ...preState,
      user: userData.user.auth.data,
      token: userData.user.auth_token,
    }));
    // console.log(state);
  }, []);

  const handleInput = (e) => {
    // console.log(e.target.files[0]);
    const nameInput = e.target.name;
    const value = e.target.value;
    let userData = { ...state.user };
    userData[nameInput] = value;
    if (e.target.files) {
      userData.photo = e.target.files[0];
    }

    setState((preState) => ({
      ...preState,
      user: userData,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let accessToken = state.token;

    let url = 'http://127.0.0.1:8000/api/v1/user/updateMe';
    let config = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json',
      },
    };
    const formData = new FormData();
    formData.append('name', state.user.name);
    formData.append('phone', state.user.phone);
    formData.append('address', state.user.address);
    formData.append('photo', state.user.photo);

    axios
      .patch(url, formData, config)
      .then((res) => {
        let userData = localStorage.getItem('appState');
        userData = JSON.parse(userData);
        userData.user.auth.data = res.data.data.user;
        localStorage.setItem('appState', JSON.stringify(userData));
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="col-sm-7 " style={{ float: 'right' }}>
      <div className="signup-form right-sidebar">
        <h2>User Update</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={state.user ? state.user.name : ''}
            onChange={handleInput}
          />
          <input
            type="tel"
            placeholder="Your Phone"
            name="phone"
            value={state.user ? state.user.phone : ''}
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Your Address"
            name="address"
            value={state.user ? state.user.address : ''}
            onChange={handleInput}
          />
          <input
            type="file"
            placeholder="Your Avatar"
            onChange={handleInput}
            name="photo"
          />
          <button type="submit" className="btn btn-default">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
