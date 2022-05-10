import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { CartState } from "../Context/Context";
import Rating from "../Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="homeContainer">
      <div className="productContainer">
        <ListGroup>
          {cart.map((data) => (
            <ListGroup.Item key={data.id}>
              <Row>
                <Col md={2}>
                  <Image src={data.image} alt={data.name} fluid rounded />
                </Col>

                <Col md={2}>
                  <span>{data.name}</span>
                </Col>

                <Col md={2}>
                  <span>BDT {data.price.split(".")[0]}</span>
                </Col>

                <Col md={2}>
                  <Rating rate={data.ratings} />
                </Col>

                <Col md={2}>
                  <Form.Control
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: data.id,
                          qty: e.target.value,
                        },
                      })
                    }
                    as="select"
                    value={data.qty}
                  >
                    {[...Array(data.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: data })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>

        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: BDT {total}
        </span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
