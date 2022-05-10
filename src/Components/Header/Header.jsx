import React from "react";
import {
  Badge,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { CartState } from "../Context/Context";
import { AiFillDelete } from "react-icons/ai";
import "./Header.css";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }} fixed="top">
      <Container>
        <Navbar.Brand>
          <Link to="/">Sahed's Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search your favourite..."
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "SORT_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle>
              <RiShoppingCartFill fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((data) => (
                    <span className="cartItem" key={data.id}>
                      <img
                        src={data.image}
                        alt={data.name}
                        className="cartItemImg"
                      />
                      <div className="cartitemdetail">
                        <span>{data.name}</span>
                        <span>BDT {data.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: data,
                          })
                        }
                      />
                    </span>
                  ))}

                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go to Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty !</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
