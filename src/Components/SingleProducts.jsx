import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "./Context/Context";
import "./products.css"



const SingleProducts = ({ data }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={data.image} alt={data.name} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>BDT {data.price.split(".")[0]}</span>
            {data.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 Days delivery</div>
            )}
            <Rating rate={data.ratings} />
          </Card.Subtitle>

          {cart.some((p) => p.id === data.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: data,
                });
              }}
              variant="danger"
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: data,
                });
              }}
              variant="primary"
              disabled={!data.inStock}
            >
              {!data.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProducts;
