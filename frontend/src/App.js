import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../src/screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrder from './screens/PlaceOrder';
import ProfileScreen from './screens/ProfileScreen';
import UploadProductScreen from './screens/UploadProductScreen';
import DashBoardScreenAdmin from './screens/DashBoardScreenAdmin';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column full-container">

        <Header />
          
        <main >
          <Container className ="mt-3">
            <Routes>
              
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen/>}/>
              <Route path="/signin" element={<SigninScreen/>}/>
              <Route path="/signup" element={<SignupScreen/>}/>
              <Route path="/shipping" element={<ShippingAddressScreen/>}/>
              <Route path="/payment" element={<PaymentMethodScreen/>}/>
              <Route path="/placeorder" element={<PlaceOrder/>}/>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/supplier/uploadProduct" element={<UploadProductScreen/>}/>
              <Route path="/product/:_id" element={<ProductScreen />} />
              <Route path= "/admin/dashboard" element={<DashBoardScreenAdmin/>}/>
              
            </Routes>
          </Container>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
