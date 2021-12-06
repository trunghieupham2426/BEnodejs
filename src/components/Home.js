import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../action/handleProductAction';
import { addCartAction } from '../action/addCartAction';
const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.productList;
  });

  useEffect(() => {
    dispatch(loadData());
  }, []);

  const addCartHandler = (id, prPrice, qty) => {
    dispatch(addCartAction(id, prPrice, qty));
  };

  const showProduct = data.map((dataPr) => {
    return (
      <div className="col-sm-4" key={dataPr._id}>
        <div className="product-image-wrapper">
          <div className="single-products">
            <div className="productinfo text-center">
              <img src={`/images/productImg/${dataPr.photo[0]}`} alt="" />
              <h2>${dataPr.price}</h2>
              <p>{dataPr.name}</p>
              <Link to="#" className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart"></i>Add to cart
              </Link>
            </div>
            <div className="product-overlay">
              <div className="overlay-content">
                <h2>{dataPr.price}</h2>
                <p id={dataPr.id}>{dataPr.name}</p>
                <Link
                  to="#"
                  className="btn btn-default add-to-cart"
                  onClick={() => addCartHandler(dataPr._id, +dataPr.price, 1)}
                >
                  <i className="fa fa-shopping-cart"></i>Add to cart
                </Link>
              </div>
            </div>
          </div>
          <div className="choose">
            <ul className="nav nav-pills nav-justified">
              <li>
                <Link to="#">
                  <i className="fa fa-plus-square"></i>Add to wishlist
                </Link>
              </li>
              <li>
                <Link to={`/product-detail/${dataPr._id}`}>
                  <i className="fa fa-plus-square"></i>More
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Features Items</h2>
          {showProduct}
        </div>
      </div>
    </>
  );
};

export default Home;
