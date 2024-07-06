const initialState = {
  items: [],
  loading: false,
  error: null,
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default productReducer;
