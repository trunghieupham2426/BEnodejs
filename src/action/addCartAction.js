import axios from 'axios';
import { config } from './../components/Config/Config';

export const addCartAction = (id, prPrice, qty) => async (dispatch) => {
  const productId = id;
  const quantity = qty;
  const price = prPrice;
  const url = `http://127.0.0.1:8000/api/v1/cart`;
  const data = {
    productId,
    quantity,
    price,
  };
  const result = await axios.post(url, data, config());
  console.log(result);

  dispatch({
    type: 'ADD_CART',
    payload: {
      totalQty: result.data.data.cart.totalQty,
    },
  });
};

export const onDeleteCart = (id) => async (dispatch) => {
  const productId = id;
  const url = `http://127.0.0.1:8000/api/v1/cart`;
  const data = {
    productId,
  };
  const result = await axios.patch(url, data, config());
  console.log(result);

  dispatch({
    type: 'ON_DELETE',
    payload: {
      totalQty: result.data.data.cart.totalQty,
    },
  });
};
