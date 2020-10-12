const INITIAL_STATE = {
  products: [
    {
      id: 1,
      name: "Canvas Print",
      description: "A Walk Amongst Friends",
    },
  ],
};

const updateProduct = (products,payload) => {
  const product = products.find((x) => x.id === 1);
  console.log(payload)
  product[payload.key] = payload.value;
  products[0] = product;
  return products;
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: updateProduct(state.products,action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;
