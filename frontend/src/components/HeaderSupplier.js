import React, { useContext, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const HeaderSupplier = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    // localStorage.removeItem('cart')

    //console.log(userInfo);
    navigate('/');
  };

  return (
    <>
      <Nav className="me-auto w-100 justify-content-end">
        <Link to="/supplier/orderList" className="nav-link">
          <i className="fas fa-shopping-cart"> </i>
          <strong>Dashboard</strong>
        </Link>

        {userInfo ? (
          <>
            <NavDropdown
              title={
                <>
                  <i className="fas fa-user"></i>
                  <strong> {userInfo.user.name}</strong>
                </>
              }
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/supplier/uploadProduct">
                <NavDropdown.Item>Upload Product</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/supplier/bankBalance">
                <NavDropdown.Item>Bank Balance</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <p className="dropdown-item" onClick={signoutHandler}>
                Signout
              </p>
            </NavDropdown>
          </>
        ) : (
          <Link className="nav-link" to="/signin">
            <i className="fas fa-user"></i>
            <strong> Sign In</strong>
          </Link>
        )}
      </Nav>
    </>
  );
};

export default HeaderSupplier;
