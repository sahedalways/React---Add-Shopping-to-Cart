import React from "react";
import { Form, Button } from "react-bootstrap";
import { CartState } from "../Context/Context";
import Rating from "../Rating";
import "./Filters.css";

const Filters = () => {
  const {
    productState: { byStock, byFastDelivery, byRating, sort },
    productDispatch,
  } = CartState();

  return (
    <div className="filters">
      <span className="title">Filters Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={"inline-1"}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>

      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={"inline-2"}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "hightToLow",
            })
          }
          checked={sort === "hightToLow" ? true : false}
        />
      </span>

      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>

      <span>
        <Form.Check
          inline
          label="Rocket Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>

      <span>
        <label style={{ paddingRight: 10 }}>Starfull Products:</label>
        <Rating
          rate={byRating}
          style={{ cursor: "pointer" }}
          onClick={(i) =>
            productDispatch({
              type: "SORT_BY_RATE",
              payload: i + 1,
            })
          }
        />
      </span>

      <Button
        variant="primary"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Filters Clear
      </Button>
    </div>
  );
};

export default Filters;
