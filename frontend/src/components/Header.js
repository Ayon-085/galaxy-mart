import React, { useContext, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import SearchBox from './SearchBox';
import HeaderAdmin from './HeaderAdmin';
import HeaderSupplier from './HeaderSupplier';


//2:17

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  console.log(' :::', cart); 
  console.log('userinfo header:', userInfo);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('cartItemsBackend')
    
    

    console.log(userInfo);
    navigate('/');
  };
  useEffect(() => {
     
   
  }, [userInfo]);
  

  return (
    <>
      <header>
        <Navbar sticky="top" className="mm" varriant="light" expand="xl">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand color="dark">
                <h3 style={{fontFamily:"'Kalam', cursive", fontWeight:"bold" }}>Galaxy Mart</h3>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {!userInfo  ? (
                <>
                  <Container>
                    <SearchBox />
                  </Container>
                  <Nav className="me-auto w-100 justify-content-end">
                    <Link to="/cart" className="nav-link">
                      <i class="fas fa-shopping-cart"> </i>
                      <strong> Cart</strong>
                      {cart.cartItems.length > 0 && (
                        <Badge pil bg="danger">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </Link>

                    {userInfo ? (
                      <>
                        <NavDropdown
                          title={
                            <>
                              <i class="fas fa-user"></i>
                              <strong> {userInfo.user.name}</strong>
                            </>
                          }
                          id="basic-nav-dropdown"
                        >
                          <LinkContainer to="/profile">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/orderhistory">
                            <NavDropdown.Item>Order history</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <p className="dropdown-item" onClick={signoutHandler}>
                            Signout
                          </p>
                        </NavDropdown>
                      </>
                    ) : (
                      <Link className="nav-link" to="/signin">
                        <i class="fas fa-user"></i>
                        <strong> Sign In</strong>
                      </Link>
                    )}
                  </Nav>
                </>
              ) : (
                <>
                  {userInfo.user.role === "consumer"? (
                    <>
                    <Container>
                    <SearchBox />
                  </Container>
                    
                      <Nav className="me-auto w-100 justify-content-end">
                        <Link to="/cart" className="nav-link">
                          <i class="fas fa-shopping-cart"> </i>
                          <strong> Cart</strong>
                          {cart.cartItems.length > 0 && (
                            <Badge pil bg="danger">
                              {cart.cartItems.reduce(
                                (a, c) => a + c.quantity,
                                0
                              )}
                            </Badge>
                          )}
                        </Link>

                        {userInfo ? (
                          <>
                            <NavDropdown
                              title={
                                <>
                                  <i class="fas fa-user"></i>
                                  <strong> {userInfo.user.name}</strong>
                                </>
                              }
                              id="basic-nav-dropdown"
                            >
                              <LinkContainer to="/profile">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                              </LinkContainer>
                              <LinkContainer to="/orderhistory">
                                <NavDropdown.Item>
                                  Order history
                                </NavDropdown.Item>
                              </LinkContainer>
                              <NavDropdown.Divider />
                              <p
                                className="dropdown-item"
                                onClick={signoutHandler}
                              >
                                Signout
                              </p>
                            </NavDropdown>
                          </>
                        ) : (
                          <Link className="nav-link" to="/signin">
                            <i class="fas fa-user"></i>
                            <strong> Sign In</strong>
                          </Link>
                        )}
                      </Nav>
                    </>
                  ) : (
                    <>
                      {userInfo.user.role === "supplier" ? (
                        <HeaderSupplier />
                      ) : (
                        <>
                          {userInfo.user.role === "admin" ? (
                            <HeaderAdmin />
                          ) : null}
                        </>
                      )}
                    </>
                  )}{' '}
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
