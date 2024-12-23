
import { createContext, useEffect, useState } from "react";
import axios from "axios"


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products,setProducts]=useState([]);
  const [token,setToken]=useState('');
  const currency = "$";
  const delivery_fee = 100;
  const backendUrl =import.meta.env.VITE_BACKEND_URL

  const addToCart = (product, selectedSize) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, size: selectedSize, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };
  const getProductsData=async()=>{
    try {
      const response= await axios.post(backendUrl+'/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
       console.log(error)
       toast.error(error.message)
    }
  }
  useEffect(()=>{
    getProductsData();
  },[])

  const value = {
    products,
    cart,
    currency,
    delivery_fee,
    orders,
    addToCart,
    removeFromCart,
    addOrder,backendUrl,
    setToken,token
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;