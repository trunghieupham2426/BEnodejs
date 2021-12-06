let iniState = {
  data: [],
  totalQty: 0,
};

const handleProductReducer = (state = iniState, action) => {
  switch (action.type) {
    case 'LOAD_PRODUCT':
      return {
        ...state,
        data: action.payload.data,
      };
    case 'ADD_CART':
      return {
        ...state,
        totalQty: action.payload.totalQty,
      };
    case 'ON_DELETE':
      return {
        ...state,
        totalQty: action.payload.totalQty,
      };
    default:
      return { ...state };
  }
};

export default handleProductReducer;
