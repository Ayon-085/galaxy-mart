import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Rating from '../components/Rating';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import axios from 'axios';

const ProductScreen = () => {
  const navigate = useNavigate();

  const [dataProduct, setData] = useState(null);

  const product = {
    _id: 2,
    name: 'Nike Slim shirt',
    slug: 'nike-slim-shirt',
    category: 'Shirts',
    image: '/images/p1.jpg', // 679px × 829px
    price: 120,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description: 'high quality shirt',
  };

  const params = useParams();
  const { _id } = params;
  //console.log('product id :  ',_id);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { userInfo } = state;
  //console.log("product",  userInfo);
  //console.log("cart",cart);

  const addToCartBackend = async () => {
    const { data } = await axios.post(
      '/cart',
      {
        productId: dataProduct._id,
        quantity: 1,
      },

      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    const cart = data.cart;
    console.log('cartBackend:', cart);
  };

  const addToCartHandler = (e) => {
    //quantity exist
    const existItem = cart.cartItems.find((x) => x._id === dataProduct._id);
    //console.log(existItem)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //console.log(quantity);

    if (dataProduct.countInStock < quantity) {
      window.alert('sorry, product is out of stock');
      return;
    }

    if (userInfo) {
      console.log('inside ');
      addToCartBackend();
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...dataProduct, quantity },
    });
    //navigate('/cart');
    ctxDispatch({
      type: 'CART_ADD_ITEM_BACKEND',
      payload: {
         productId:dataProduct._id,
         supplier: dataProduct.supplier,
         price: dataProduct.price,
         quantity:quantity,
         
        },
    });
  };

  const fetchData = async (e) => {
    const { data } = await axios.get(`/products/details/${_id}`);

    setData(data.product);
    const prt = dataProduct ? console.log('id base data', dataProduct) : null;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {dataProduct ? (
        <Row>
          <Col md={6}>
            <img
              className="img-large"
              src={`/images/${dataProduct.images[0].img}`}
              alt="loading"
            />
          </Col>
          <Col md={6}>
            <ListGroup varrient="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{dataProduct.name}</title>
                </Helmet>
                <h1>{dataProduct.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={dataProduct.rating}
                  numReviews={dataProduct.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${dataProduct.price}</ListGroup.Item>
              <ListGroup.Item>
                description:
                <p> {dataProduct.description} </p>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup varriant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>{dataProduct.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>status :</Col>
                  <Col>
                    {dataProduct.countInStock > 0 ? (
                      <Badge bg="success">In stock</Badge>
                    ) : (
                      <Badge bg="danger">Unavailable</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {dataProduct.countInStock > 0 && (
                <ListGroup.Item className="d-flex">
                  <div>
                    <Button onClick={addToCartHandler} varriant="primary">
                      Add to Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          {/* <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup varriant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>{dataProduct.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>status :</Col>
                      <Col>
                        {dataProduct.countInStock > 0 ? (
                          <Badge bg="success">In stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {dataProduct.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} varriant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      ) : null}
    </div>
  );
};

export default ProductScreen;
