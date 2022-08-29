import { createContext, useReducer } from 'react';



export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? 
  JSON.parse(localStorage.getItem('userInfo'))
  :null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
     ? JSON.parse(localStorage.getItem('shippingAddress'))
    :{}, 
    // paymentMethod: localStorage.getItem('paymentMethod')
    //  ? JSON.parse(localStorage.getItem('paymentMethod'))
    // :'', 

    cartItems: localStorage.getItem('cartItems')
     ? JSON.parse(localStorage.getItem('cartItems'))
    :[], 

  },
  category:localStorage.getItem('category')?
  JSON.parse(localStorage.getItem('category')):[]
};



function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //add cart
      //localStorage.setItem('cartItems', JSON.stringify(cartItems));
      const newItem = action.payload;
      //console.log("newitem",newItem)
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      )

       const cartItems = existItem ? state.cart.cartItems.map(
        (item)=> item._id === existItem._id ? newItem : item
      )
      : [...state.cart.cartItems, newItem] ;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {...state, cart: {...state.cart, cartItems}}
      
     case 'CART_REMOVE_ITEM' : 
     {
       const cartItems = state.cart.cartItems.filter(
          (item) =>
          {
            console.log(item._id)
            console.log(action.payload._id)
             
           return item._id !==action.payload._id
          }
        );
        //console.log("store :",cartItems)
       localStorage.setItem('cartItems', JSON.stringify(cartItems));
       return {...state, cart:{...state.cart, cartItems}}
      }
     case 'CLEAR_CART':{
      return {...state, cart:{...state.cart,cartItems:[]}}
     }
     case 'USER_SIGNIN':
       return {...state, userInfo:action.payload}
     case 'USER_SIGNOUT':
       console.log('dddd')
       return {
         ...state,
         userInfo:null,
         cart:{
           cartItems: [],
           shippingAddress:{},
           paymentMethod:''
         }
       }
      case 'SAVE_SHIPPING_ADDRESS':
        return{
          ...state,
          cart:{
            ...state.cart,
            shippingAddress:action.payload
          }
        }
    //  case 'SAVE_PAYMENT_METHOD':
    //   return {
    //     ...state,
    //     cart: { ...state.cart, paymentMethod:action.payload },
    //   };

      case 'CATEGORY':
      return  {
          ...state,
          category:action.payload

        }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
