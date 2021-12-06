import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from '../Config/Config';
// redux
import { useDispatch } from 'react-redux';
import { addCartAction, onDeleteCart } from '../../action/addCartAction';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/v1/cart/616db5112cdb7642a448d164`,
        config()
      )
      .then((res) => {
        setTotalPrice(res.data.data.cart.totalPrice);
        setCart(res.data.data.cart.products);
      })
      .catch((e) => console.log(e.response.data.message));
  }, []);

  const addCartHandler = (id, prPrice, qty, operation) => {
    let carts = [...cart];
    carts.forEach((el) => {
      if (el.productId._id === id) {
        if (operation === 'ADD') {
          el.quantity++;
        }
        if (operation === 'MINUS') {
          el.quantity--;
        }
      }
    });
    setCart(carts);

    dispatch(addCartAction(id, prPrice, qty));
  };
  const removeProductHandler = (prId) => {
    let carts = [...cart].filter((el) => el.productId._id !== prId);
    setCart(carts);
    dispatch(onDeleteCart(prId));
  };

  let renderCart = cart.map((pr, i) => {
    return (
      <tr>
        <td className="cart_product">
          <Link to="">
            <img
              src={`/images/productImg/${pr.productId.photo[0]}`}
              alt=""
              style={{ width: '100px', height: '80px' }}
            />
          </Link>
        </td>
        <td className="cart_description">
          <h4>
            <Link to="">{pr.productId.name}</Link>
          </h4>
          <p>Web ID: {i + 1}</p>
        </td>
        <td className="cart_price">
          <p>${pr.price}</p>
        </td>
        <td className="cart_quantity">
          <div className="cart_quantity_button">
            <Link
              className="cart_quantity_up"
              to="#"
              onClick={(e) =>
                addCartHandler(pr.productId._id, pr.price, 1, 'ADD')
              }
            >
              {' '}
              +{' '}
            </Link>
            <input
              disabled
              className="cart_quantity_input"
              type="number"
              name="quantity"
              value={pr.quantity}
              autoComplete="off"
              size="2"
              min="0"
            />
            <Link
              className="cart_quantity_down"
              to="#"
              onClick={(e) =>
                addCartHandler(pr.productId._id, pr.price, -1, 'MINUS')
              }
            >
              {' '}
              -{' '}
            </Link>
          </div>
        </td>
        <td className="cart_total">
          <p className="cart_total_price">${pr.price * pr.quantity}</p>
        </td>
        <td className="cart_delete">
          <Link
            className="cart_quantity_delete"
            to="#"
            onClick={() => removeProductHandler(pr.productId._id)}
          >
            <i className="fa fa-times"></i>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <Link to="#">Home</Link>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description"></td>
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>{renderCart}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping & Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <Link className="btn btn-default update" to="">
                  Get Quotes
                </Link>
                <Link className="btn btn-default check_out" to="">
                  Continue
                </Link>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>${totalPrice}</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>${totalPrice ? totalPrice + 2 : 0}</span>
                  </li>
                </ul>
                <Link className="btn btn-default update" to="">
                  Update
                </Link>
                <Link className="btn btn-default check_out" to="">
                  Check Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
