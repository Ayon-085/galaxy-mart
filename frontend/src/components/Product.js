import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import data from '../data';
import axios from 'axios';
import { Store } from '../Store';
//import images from '../../../backend/api/uploads'

const productStatic = {
  _id: 2,
  name: 'Nike Slim shirt',
  slug: 'nike-slim-shirt',
  category: 'Shirts',
  image: '/images/iphone.jpg', // 679px × 829px
  price: 120,
  countInStock: 10,
  brand: 'Nike',
  rating: 4.5,
  numReviews: 10,
  description: 'high quality shirt',
};

const Product = (props) => {
  const { product } = props;
  console.log('product info :', product);
  console.log('product image :', product.images[0].img);
  const img = {
    img: `/images/${product.images[0].img}`,
  };
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const {
    cart: { cartItems },
  } = state;
  //console.log(cartItems);

  const addToCartHandler = async (item) => {
    if (userInfo) {
    }
    const existItem = cartItems.find((x) => x._id === item._id);
    //console.log(existItem)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //console.log(quantity);

    //backend
    console.log('item', item);
    const { data } = await axios.get(`/products/details/${item._id}`);
    //console.log(data);

    if (data.product.countInStock < quantity) {
      window.alert('Sorry , product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <>
      <Card key={product._id}>
        <Link to={`/product/${product._id}`}>
        {/* `/images/${product.images[0].img}` */}
          <img src={'/images/iphone.jpg'} className="card-img-top" alt={product.name} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>{product.name} </Card.Title>
          </Link>
          <Rating
            rating={productStatic.rating}
            numReviews={productStatic.numReviews}
          />
          <Card.Text>
            <strong> ${product.price}</strong>
          </Card.Text>
          {product.countInStock === 0 ? (
            <Button disabled>Out of Stock</Button>
          ) : (
            <Button
              onClick={() => {
                addToCartHandler(product);
              }}
            >
              Add to cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
