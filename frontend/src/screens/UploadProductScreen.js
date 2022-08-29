import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Store } from '../Store';

const UploadProductScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo, category } = state;
  //console.log(category);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryName, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(price);
    formData.append('images', img);
    formData.append('price', price);
    formData.append('category', categoryName);
    formData.append('description', description);
    formData.append('countInStock', countInStock);
    formData.append('name', name);
    //allData.set('price',price)
    //console.log(allData);

    console.log(img);
    axios.post('/products/create_products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${userInfo.token}`,
      },
    }).then(
      response => console.log(response.product)
  ).catch(
      error => console.log(error)
  )

  
  };

  // useEffect(() => {
  //   if (!userInfo) {
  //     fetchData();

  //   } else if (userInfo.user.role === 'consumer') {
  //     fetchData();
  //   }
  // }, []);

  return (
    <>
      <Container className="small-container">
        <h1 className="my-3">Upload Product</h1>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label> Product Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>price </Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Catagory</Form.Label>
            <Form.Control
              
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {/* {category &&
                category.map((item) => {
                  return <option value={item._id} >{item.name}</option>
                  
                })} */}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit"> Upload </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default UploadProductScreen;
