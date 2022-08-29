import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps'
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

const PaymentMethodScreen = () => {

   const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart1}=state;
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;


  const [paymentMethodName, setPaymentMethod] = useState( "IBC");
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    

    console.log("ddd",cart1);
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
    //  navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  
 
  return (
    <>
       <CheckoutSteps step1 step2 step3/>

       <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="bank"
              label="IBC" 
              value="IBC"
              checked={paymentMethodName === "IBC"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
    <Container className="small-container">
      <h1 className="my-3">Bank Information</h1>
      <Form >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control  required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Bank Account No.</Form.Label>
          <Form.Control
           required
          />
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              required
            />
          </Form.Group>
        </Form.Group>
      </Form>
    </Container>
            
          </div>
         
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default PaymentMethodScreen