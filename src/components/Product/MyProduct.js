import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../Config/Config';

const MyProduct = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/product/my-product`, config())
      .then((res) => {
        setProducts(res.data.data.products);
      });
  }, []);

  const deleteProductHandler = (id) => {
    const newList = products.filter((el) => {
      return el._id !== id;
    });
    setProducts(newList);
    axios.delete(`http://127.0.0.1:8000/api/v1/product/${id}`, config());
  };

  const editProductHandler = (id) => {
    props.history.push(`/account/edit-product/${id}`);
  };

  let myProduct = products.map((product, i) => {
    return (
      <tbody key={product._id}>
        <tr>
          <td>{i}</td>
          <td>{product.name}</td>
          <td>
            <img
              src={`/images/productImg/${product.photo[0]}`}
              alt="product-img"
              style={{ width: '50px', height: '50px' }}
            />
          </td>
          <td>{product.price}</td>
          <td>
            <a
              href
              className="edit"
              title="Edit"
              style={{ marginRight: '50px' }}
              to="/account/edit-product"
              onClick={() => editProductHandler(product._id)}
            >
              <i className="far fa-edit"></i>
            </a>
            <a
              href
              className="delete"
              title="Delete"
              onClick={() => {
                localStorage.removeItem('product');
                deleteProductHandler(product._id);
              }}
            >
              <i className="far fa-trash-alt"></i>
            </a>
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className="col-sm-9">
      <table className="table table-bordered ">
        <thead>
          <tr style={{ background: '#fe980f' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        {myProduct}
      </table>
      <button
        style={{ background: '#fe980f' }}
        type="submit"
        className="btn btn-default"
        onClick={() => props.history.push('/account/add-product')}
      >
        ADD NEW
      </button>
    </div>
  );
};

export default MyProduct;
