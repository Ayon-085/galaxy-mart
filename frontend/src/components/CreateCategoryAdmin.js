import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const CreateCategoryAdmin = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {userInfo}=state;

  const [name, setName] = useState('');

  const [password, setPassword] = useState('');
  const [img, setImg] = useState(null);


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('image', img);
    formData.append('name', name);
 
    //allData.set('price',price)
    //console.log(allData);
   

     console.log(img)
     const data = await axios.post('/category/create-category', formData,
     {
      headers:
      { 
      'Content-Type': 'multipart/form-data',
       authorization: `Bearer ${userInfo.token}`
       },
       
     })
  //  await  axios({
  //     method: 'post',
  //     url: '/products/create_products',
  //     data: formData,
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   })
  //     .then(function (response) {
  //       //handle success
  //       console.log(response);
  //     })
  //     .catch(function (response) {
  //       //handle error
  //       console.log(response);
  //     });

  console.log(data);

  };

  const submitHandler = () => {};

  return (
    <>
      <Container className="small-container">
        <Helmet>
          <title>Create Categoey</title>
        </Helmet>
        <h3 className="my-3">Create Category</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label> Category Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit" onClick={onSubmitHandler}>Submit</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default CreateCategoryAdmin;
