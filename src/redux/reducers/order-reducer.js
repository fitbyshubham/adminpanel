const INITIAL_STATE = {
  products: [
    {
      ID: 1,
      image:
        "https://img.freepik.com/free-vector/abstract-halftone-background_23-2148583453.jpg?size=664&ext=jpg&ga=GA1.2.1319481524.1588082377",
      name: "A Walk Amongst Friends - Canvas Print	",
      price: 10.24,
      quantity: 1,
    },
    {
      ID: 2,
      image:
        "https://img.freepik.com/free-vector/abstract-halftone-background_23-2148583453.jpg?size=664&ext=jpg&ga=GA1.2.1319481524.1588082377",
      name: "Lago di Braies - Canvas Print	",
      price: 12.74,
      quantity: 1,
    },
    {
      ID: 3,
      image:
        "https://img.freepik.com/free-vector/abstract-halftone-background_23-2148583453.jpg?size=664&ext=jpg&ga=GA1.2.1319481524.1588082377",
      name: "Never Stop Changing - Canvas",
      price: 13.24,
      quantity: 1,
    },
  ],
};

const addOrderProduct = (products, item) => {
  var products1 = [
    ...products,
    {
      ID: products.length + 1,
      image:
        "https://img.freepik.com/free-vector/abstract-halftone-background_23-2148583453.jpg?size=664&ext=jpg&ga=GA1.2.1319481524.1588082377",
      name: item.name,
      price: 0.0,
      quantity: 0,
    },
  ];

  return products1;
};

const OrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_ORDER_PRODUCT":
      return {
        ...state,
        products: addOrderProduct(state.products, action.payload),
      };
    default:
      return state;
  }
};

export default OrderReducer;
