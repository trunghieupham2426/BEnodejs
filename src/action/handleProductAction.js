import axios from 'axios';

export const loadData = () => async (dispatch) => {
  const result = await axios.get(
    `http://127.0.0.1:8000/api/v1/product/home-product`
  );
  // console.log(result.data.data.products);

  dispatch({
    type: 'LOAD_PRODUCT',
    payload: {
      data: result.data.data.products,
    },
  });
};
