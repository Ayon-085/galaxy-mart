import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const signUpImage = {
  image: '/images/signup.svg', // 679px × 829px
};

const SignupScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const{ data }= await Axios.post('users/register', {
        name,
        email,
        role,
        password,
      });
      console.log(data.user);
       // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
       // localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(redirect || '/');
    } catch (err) {
        window.alert(err)
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
    <Container>
        <Row>
          <Col md={6}>
      <Container className="small-container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              type="text"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="consumer">consumer</option>
              <option value="supplier">supplier</option>
              <option value="admin">admin</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          
          <div className="mb-3">
            <Button type="submit">Sign Up</Button>
          </div>
          <div className="mb-3">
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </Container>
      </Col>
        <Col md={6} style={{display:"flex" }}>
            <img src={signUpImage.image} alt="ddd" width="100%" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupScreen;
