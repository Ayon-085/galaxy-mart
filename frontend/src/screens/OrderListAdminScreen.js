import React from 'react'
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';

const OrderListAdminScreen = () => {
  return (
    <>
       <Helmet>
        <title>Admin order List</title>
      </Helmet>

      <h1>Order List</h1>
      {/* {orders ?  */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          {/* <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))
             }
          </tbody>: null */}
        </table>
      {/* } */}
    
           
    </>
  )
}

export default OrderListAdminScreen