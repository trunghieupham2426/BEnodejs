import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { editPrdState } from '../productState/editPrdState';
import { useParams } from 'react-router-dom';
import { config } from '../Config/Config';
const EditProduct = (props) => {
  let initState = { ...editPrdState() };
  const [state, setState] = useState(initState);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/product/${id}`, config())
      .then((res) => {
        console.log(res);
        setState((prevState) => {
          return {
            ...prevState,
            name: res.data.data.product.name,
            price: res.data.data.product.price,
            category: res.data.data.product.category,
            brand: res.data.data.product.brand,
            status: res.data.data.product.status,
            discount: res.data.data.product.discount,
            description: res.data.data.product.description,
            id: res.data.data.product._id,
            showPhoto: res.data.data.product.photo,
            originalPhotos: res.data.data.product.photo,
          };
        });
      });
  }, []);

  const handleUserInputFile = (e) => {
    let file = e.target.files;
    setState((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };
  const onChange = (e) => {
    let value = e.target.value;
    let nameInput = e.target.name;
    setState((prevState) => ({
      ...prevState,
      [nameInput]: value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let url = `http://127.0.0.1:8000/api/v1/product/${state.id}`;
    const formData = new FormData();
    formData.append('category', state.category);
    formData.append('brand', state.brand);
    formData.append('description', state.description);
    formData.append('name', state.name);
    formData.append('price', state.price);
    formData.append('amount', state.amount);
    formData.append('status', state.status);
    formData.append('discount', state.discount);
    formData.append('originalPhotos', state.originalPhotos);
    formData.append('deletePhotos', state.deletePhotos);
    Object.keys(state.photo).forEach((item) => {
      formData.append('photo', state.photo[item]);
    });

    axios
      .patch(url, formData, config())
      .then((res) => {
        if (res.data.status === 'success') {
          alert('edit product success');
          props.history.push('/account/my-product');
        }
        // console.log(res);
      })
      .catch((err) => alert(err.response.data.message));
  };

  const checkboxHandler = (e) => {
    let value = e.target.checked;
    let imgName = e.target.name;
    let delImgNameList = [...state.deletePhotos];
    let imgList = [];
    if (value) {
      imgList.push(imgName);
      delImgNameList = delImgNameList.concat(imgList);
      setState((prevState) => ({
        ...prevState,
        deletePhotos: delImgNameList,
      }));
    }

    if (!value) {
      let newDelImgNameList = delImgNameList.filter((img) => {
        return img !== imgName;
      });
      setState((prevState) => ({
        ...prevState,
        deletePhotos: newDelImgNameList,
      }));
    }
  };

  let imgPr = state.showPhoto.map((img) => {
    return (
      <div
        style={{
          width: '50px',
          display: 'inline-block',
          marginRight: '15px',
        }}
        key={img}
      >
        <img
          src={`/images/productImg/${img}`}
          alt=""
          style={{
            width: '50px',
            height: '50px',
            margin: '0',
            padding: '0',
            display: 'block',
          }}
        />
        <input
          name={img}
          type="checkbox"
          style={{ margin: '0', padding: '0', display: 'block' }}
          onChange={checkboxHandler}
        />
      </div>
    );
  });
  return (
    <div className="col-sm-7 " style={{ float: 'right' }}>
      {/* <Redirect to="/account/my-product" /> */}
      <div className="signup-form right-sidebar">
        <h2>EDIT PRODUCT</h2>
        <form onSubmit={submitHandler}>
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
            id="img"
            name="photo"
            accept="image/*"
            onChange={handleUserInputFile}
            multiple
          />
          {imgPr}

          <textarea
            name="description"
            placeholder="Description"
            rows="11"
            onChange={onChange}
            value={state.description}
          ></textarea>
          <button type="submit" className="btn btn-default">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
