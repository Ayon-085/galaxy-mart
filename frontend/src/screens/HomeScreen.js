import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import data from '../data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import axios from 'axios';
import { Store } from '../Store';
import OrderListAdminScreen from './OrderListAdminScreen';
import OrderListSupplierScreen from './OrderListSupplierScreen';

const HomeScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, category, cart } = state;
  console.log(category);
  console.log("cart",cart);

  //setTimeout(()=>{console.log(dataProduct,"dhukse")},5000)
  const [dataProduct, setData] = useState(null);

  const dataDhukbe = async (data) => {
    //console.log(Object.values(data.products).at(0));
    setData(Object.values(data.products));

    // for (let i in data.products) {
    //   setData(...dataProduct, data.products[i]);
    // }
  };

  const fetchData = async () => {
    const { data } = await axios.get('/products');
    console.log('data asche :', data);
    dataDhukbe(data);
  };

  const getAllCategory = async () => {
    const { data } = await axios.get('/category');
    //console.log(data);
    ctxDispatch({ type: 'CATEGORY', payload: data.category });
    localStorage.setItem('category', JSON.stringify(data.category));
  };

  useEffect(() => {
    getAllCategory();
    if (!userInfo) {
      fetchData();
    } else if (userInfo.user.role === 'consumer') {
      fetchData();
    }
  }, [userInfo]);

  return (
    <div>
      {!userInfo ? (
        <>
          <h4> Featured product</h4>
          <div className="products">
            {dataProduct ? (
              <Row>
                {dataProduct.map((product) => {
                  return (
                    <Col sm={6} md={4} lg={4} className="mb-3">
                      <Product product={product}></Product>
                    </Col>
                  );
                })}
              </Row>
            ) : null}
          </div>
        </>
      ) : (
        <>
          {userInfo.user.role === 'consumer' ? (
            <>
              <h4> Featured product</h4>
              <div className="products">
                {dataProduct ? (
                  <Row>
                    {dataProduct.map((product) => {
                      return (
                        <Col sm={6} md={4} lg={4} className="mb-3">
                          <Product product={product}></Product>
                        </Col>
                      );
                    })}
                  </Row>
                ) : null}
              </div>
            </>
          ) : (
            <>
              {userInfo.user.role === 'admin' ? (
                <>
                  <OrderListAdminScreen />
                </>
              ) : (
                <>
                  {userInfo.user.role === 'supplier' ? (
                    <>
                      <OrderListSupplierScreen />
                    </>
                  ) : null}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomeScreen;
