import React from "react";
import { CartState } from "../Context/Context";
import Filters from "../Filters/Filters";
import SingleProducts from "../SingleProducts";
import "./Home.css";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((data) => data.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((data) => data.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (data) => data.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((data) =>
        data.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="homeContainer">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((data) => {
          return <SingleProducts data={data} key={data.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
