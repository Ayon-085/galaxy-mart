import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Store } from '../Store';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import axios from 'axios';

const CartScreen = () => {
  const navigate = useNavigate();
  
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {userInfo}=state;

  const {
    cart: { cartItems },
  } = state;
  //console.log(cartItems);

  const updateCartHandler = async (item, quantity) => {

    //backend
      console.log("item", item)
      const {data}= await axios.get(`/products/details/${item._id}`)
      //console.log(data);
   
      if(data.product.countInStock<quantity){
        window.alert("Sorry , product is out of stock");
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity},
      });
  };

  const removeHandler = (item) => {
    console.log("insideremove")
     console.log(item._id);
    ctxDispatch({
       type: 'CART_REMOVE_ITEM',
       payload: item
       });
  };

  const checkOutHandler = async () => {
    
    if(userInfo){
      
    }
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shoping Cart</title>
      </Helmet>
      <h1> shoping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>Cart is empty <Link to='/'>Go Shoping</Link></MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={`/images/${item.images[0].img}`}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={()=>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="light"
                        onClick = {() =>
                          updateCartHandler(item, item.quantity +1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col>
                      <Button
                        variant="light"
                        onClick={() =>
                           removeHandler(item)
                          }
                        >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                    item): $
                    {cartItems.reduce((a, c) => a + c.price *c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      varriant="primary"
                      onClick={checkOutHandler}
                      disabled={cartItems.length ===0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
