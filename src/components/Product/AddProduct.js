import React, { useEffect, useState } from 'react';
import axios from 'axios';
// product state
import { addPrdState } from '../productState/addPrdState';
// redux
import { useSelector } from 'react-redux';

const AddProduct = (props) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  let iniState = { ...addPrdState() };
  const [state, setState] = useState(iniState);
  const onChange = (e) => {
    let value = e.target.value;
    let nameInput = e.target.name;
    setState((prevState) => ({
      ...prevState,
      [nameInput]: value,
    }));
  };
  const handleUserInputFile = (e) => {
    const file = e.target.files;
    if (file.length > 3) {
      alert('vui long upload toi da 3 hinh');
      return;
    }
    setState((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = localStorage.getItem('appState');
    userData = JSON.parse(userData);
    let sellerId = userData.user.auth.data._id;
    console.log(sellerId);
    if (isLoggedIn) {
      let url = 'http://127.0.0.1:8000/api/v1/product';
      let accessToken = userData.user.auth_token;
      let config = {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      };
      const formData = new FormData();
      formData.append('category', state.category);
      formData.append('brand', state.brand);
      formData.append('description', state.description);
      formData.append('name', state.name);
      formData.append('price', state.price);
      formData.append('amount', state.amount);
      formData.append('discount', state.discount);
      formData.append('status', state.status || 'new');
      formData.append('seller', sellerId);

      Object.keys(state.photo).forEach((item) => {
        formData.append('photo', state.photo[item]);
      });

      axios
        .post(url, formData, config)
        .then((res) => {
          console.log(res);
          if (res.data.status === 'success') {
            alert('add product success');
            props.history.push('/account/my-product');
          }
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div className="col-sm-7 " style={{ float: 'right' }}>
      <div className="signup-form right-sidebar">
        <h2>Create Product</h2>
        <form
          action="upload.php"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            onChange={onChange}
            value={state.name}
          />

          <input
            type="number"
            placeholder="Price"
            name="price"
            onChange={onChange}
            value={state.price}
          />
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            onChange={onChange}
            value={state.amount}
          />

          <select
            id="category"
            name="category"
            onChange={onChange}
            value={state.category}
          >
            <option value="">Choose Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
          </select>

          <select
            id="brand"
            name="brand"
            onChange={onChange}
            value={state.brand}
          >
            <option value="">Choose Brand</option>
            <option value="nike">NIKE</option>
            <option value="apple">APPLE</option>
            <option value="samsung">SAMSUNG</option>
          </select>

          <select
            id="status"
            name="status"
            onChange={onChange}
            value={state.status}
          >
            <option value="">Choose Status</option>
            <option value="sale">Sale</option>
            <option value="new">New</option>
          </select>
          <input
            type="number"
            name="discount"
            placeholder="%"
            className={state.status === 'sale' ? '' : 'hidden'}
            onChange={onChange}
            value={state.discount}
          />

          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            multiple
            onChange={handleUserInputFile}
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="11"
            onChange={onChange}
            value={state.description}
          ></textarea>
          <button type="submit" className="btn btn-default">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
