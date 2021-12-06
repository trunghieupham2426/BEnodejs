import React, { useState, useRef } from 'react';
import axios from 'axios';

const Register = () => {
  let iniState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    address: '',
  };
  const [state, setState] = useState(iniState);
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [nameInput]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirm: state.passwordconfirm,
      phone: state.phone,
      address: state.address,
    };
    axios
      .post('http://127.0.0.1:8000/api/v1/user/signup', user)
      .then((res) => {
        if (res.data.status === 'success') {
          alert('regis success');
          let subState = { ...state };
          Object.keys(subState).forEach((key) => {
            subState[key] = '';
          });

          setState((prevState) => ({
            ...prevState,
            ...subState,
          }));
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
          alert(err.response.data.message);
          //do something
        } else if (err.request) {
          console.log(2);
          //do something else
        } else if (err.message) {
          console.log(3);
        }
      });
  };

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>New User Signup!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleInput}
            value={state.name}
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleInput}
            value={state.email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={state.password}
          />
          <input
            type="password"
            placeholder="Password Confirm"
            name="passwordconfirm"
            onChange={handleInput}
            value={state.passwordconfirm}
          />
          <input
            type="tel"
            placeholder="Your Phone"
            name="phone"
            onChange={handleInput}
            value={state.phone}
          />
          <input
            type="text"
            placeholder="Your Address"
            name="address"
            onChange={handleInput}
            value={state.address}
          />
          <p className="err level-err"></p>
          <button type="submit" className="btn btn-default">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// const handleUserInputFile = (e) => {
//   console.log(e.target.files[0]);
//   const file = e.target.files;
//   let reader = new FileReader();
//   reader.onload = (e) => {
//     setState((prevState) => ({
//       ...prevState,
//       avatar: e.target.result,
//       file: file[0],
//     }));
//   };
//   reader.readAsDataURL(file[0]);
// };
