import { createContext, useContext, useReducer } from "react";
import faker from "@faker-js/faker";
import { CartReducer, produuctReducer } from "./Reducer";

const ShopCart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const initialState = {
    products: products,
    cart: [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const [productState, productDispatch] = useReducer(produuctReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <ShopCart.Provider value={{ state, dispatch,  productState, productDispatch }}>
      {children}
    </ShopCart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(ShopCart);
};
