
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios"
// import { useNavigate } from 'react-router-dom';



// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const [cart, setCart] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [products,setProducts]=useState([]);
//   const [token,setToken]=useState('');
//   const navigate =useNavigate();
//   const currency = "$";
//   const delivery_fee = 100;
//   const backendUrl =import.meta.env.VITE_BACKEND_URL
 


  

//   const addToCart = async(product, selectedSize) => {
//     setCart((prevCart) => {
//       const existingItemIndex = prevCart.findIndex(
//         (item) => item.id === product._id && item.size === selectedSize
//       );
//       if (existingItemIndex !== -1) {
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex].quantity += 1;
//         return updatedCart;
//       }
//       return [...prevCart, { ...product, size: selectedSize, quantity: 1 }];
//     });
//     if(token){
//       try {
//          await axios.post(backendUrl+'/api/cart/add',{product,selectedSize},{headers:{token}})
       

//         //
//       } catch (error) {
//         console.log(error)
//        toast.error(error.message)
//       }
//     }

//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const addOrder = (order) => {
//     setOrders((prevOrders) => [...prevOrders, order]);
//   };
//   const getProductsData=async()=>{
//     try {
//       const response= await axios.post(backendUrl+'/api/product/list')
//       if(response.data.success){
//         setProducts(response.data.products)
//       }else{
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//        console.log(error)
//        toast.error(error.message)
//     }
//   }
//   useEffect(()=>{
//     getProductsData();
//   },[])

//   useEffect(()=>{
//     if(!token && localStorage.getItem('token')){
//       setToken(localStorage.getItem('token'))
//     }
//   },[])

//   const value = {
//     products,
//     cart,
//     currency,
//     delivery_fee,
//     orders,
//     addToCart,
//     removeFromCart,
//     addOrder,backendUrl,
//     setToken,token,
//     navigate,
    
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const [cart, setCart] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState("");
//   const [userId, setUserId] = useState(null); // To store the user ID
//   const navigate = useNavigate();
//   const currency = "$";
//   const delivery_fee = 100;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const decodeToken = (token) => {
//     try {
//       const base64Url = token.split(".")[1];
//       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split("")
//           .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
//           .join("")
//       );
//       return JSON.parse(jsonPayload);
//     } catch (error) {
//       console.error("Error decoding token:", error.message);
//       return null;
//     }
//   };
  
//   // Usage
//   const extractUserIdFromToken = () => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       const decoded = decodeToken(storedToken);
//       setUserId(decoded?.user_id); // Adjust based on your JWT payload structure
//     }
//   };
  


//   // Add to cart functionality
//   const addToCart = async (product, selectedSize) => {
//     setCart((prevCart) => {
//       const existingItemIndex = prevCart.findIndex(
//         (item) => item._id === product._id && item.size === selectedSize
//       );
//       if (existingItemIndex !== -1) {
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex].quantity += 1;
//         return updatedCart;
//       }
//       return [...prevCart, { ...product, size: selectedSize, quantity: 1 }];
//     });

//     if (token) {
//       const userId = extractUserIdFromToken(token); // Decode user ID from token
//       try {
//         const response = await axios.post(
//           `${backendUrl}/api/cart/add`,
//           { userId, itemId: product._id, size: selectedSize },
//           { headers: { token } }
//         );
//         console.log("Add to Cart Response:", response.data);
//       } catch (error) {
//         console.error("Add to Cart API Error:", error.message);
//       }
//     }
//   };

//   const fetchCart = async () => {
//     const userId =extractUserIdFromToken(token); 
//     if (!userId) {
//         console.warn("No userId found; cannot fetch cart");
//         return;
//     }

//     try {
//         const response = await axios.post(`${backendUrl}/api/cart/get`, { userId });
//         if (response.data.success) {
//             const cartData = response.data.cartData;
//             console.log("Cart data fetched from backend:", cartData); // Debug log
//             const cartArray = [];

//             // Convert cartData into an array for frontend use
//             for (const itemId in cartData) {
//                 for (const size in cartData[itemId]) {
//                     cartArray.push({
//                         id: itemId,
//                         size,
//                         quantity: cartData[itemId][size],
//                     });
//                 }
//             }

//             console.log("Cart array for state:", cartArray); // Debug log
//             setCart(cartArray); // Update state
//         } else {
//             console.error("Error fetching cart:", response.data.message);
//         }
//     } catch (error) {
//         console.error("Error fetching cart:", error.message);
//     }
// };


// const removeFromCart = async (itemId, size) => {
//   const userId = extractUserIdFromToken(token);
//   if (!userId) return;

//   setCart((prevCart) =>
//       prevCart.filter((item) => !(item.id === itemId && item.size === size))
//   );

//   try {
//       await axios.post(`${backendUrl}/api/cart/remove`, { userId, itemId, size });
//   } catch (error) {
//       console.error("Error removing from cart:", error.message);
//   }
// };

//   // Fetch products data from the backend
//   const getProductsData = async () => {
//     try {
//       const response = await axios.post(`${backendUrl}/api/product/list`);
//       if (response.data.success) {
//         setProducts(response.data.products);
//       } else {
//         console.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error.message);
//     }
//   };

//   // UseEffect to initialize products and userId
//   useEffect(() => {
//     getProductsData();
//     extractUserIdFromToken(); // Extract userId from token on initial load
//   }, []);

// useEffect(() => {
//   if (!token) {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken) {
//           setToken(storedToken);
//       } else {
//           console.warn("No token found; user may not be logged in");
//       }
//   }
// }, [token]);
// useEffect(() => {
//   if (token) {
//       fetchCart();
//   }
// }, [token]);

//   const value = {
//     products,
//     cart,
//     currency,
//     delivery_fee,
//     orders,
//     addToCart,
//     removeFromCart,
//     setToken,
//     token,
//     userId, // Expose userId to the context consumers
//     navigate,
//     backendUrl
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null); // To store the user ID
  const navigate = useNavigate();
  const currency = "$";
  const delivery_fee = 100;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  


  const decodeToken = (token) => {
    try {
      if (!token) {
        console.error("No token provided for decoding.");
        return null;
      }
  
      console.log("Raw Token:", token);
  
      const base64Url = token.split(".")[1];
      if (!base64Url) {
        console.error("Invalid token structure: Missing payload.");
        return null;
      }
  
      console.log("Base64 Payload:", base64Url);
  
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
  
      console.log("Decoded Payload:", jsonPayload);
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  };
  const initializeUserId = () => {
    const storedToken = localStorage.getItem("token");
  
    if (!storedToken) {
      console.warn("No token found in localStorage.");
      setUserId(null);
      return;
    }
  
    console.log("Stored Token from localStorage:", storedToken);
  
    const decoded = decodeToken(storedToken);
    if (!decoded) {
      console.error("Failed to decode token.");
      setUserId(null);
      return;
    }
  
    console.log("Decoded Token Data:", decoded);
  
    // Use _id from the decoded token
    if (!decoded._id) {
      console.warn("No _id found in decoded token.");
      setUserId(null);
      return;
    }
  
    setUserId(decoded._id);
  };
  
    
    const addToCart = async (product, selectedSize) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id && item.size === selectedSize
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, size: selectedSize, quantity: 1 }];
    });

    if (token) {
      //const userId = extractUserIdFromToken(token); // Decode user ID from token
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { userId, itemId: product._id, size: selectedSize },
          { headers: { token } }
        );
        if (response.data.success) {
          await fetchCart(); // Fetch updated cart after adding item
        }
        console.log("Add to Cart Response:", response.data);
      } catch (error) {
        console.error("Add to Cart API Error:", error.message);
      }
    }
  };


  const fetchCart = async () => {
    if(token){
      initializeUserId();
    }else{
      console.log("NO token");
    }
    console.log("Current userId in fetchCart:", userId);
    if (!userId) {
      console.warn("No userId found; cannot fetch cart");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, { userId },{ headers: { token } });
      if (response.data.success) {
        const cartWithDetails = response.data.cart; // Get the cart array with details
        const formattedCart = [];
  
        // Process the cart data for the frontend (flatten sizes into cart items)
        cartWithDetails.forEach((product) => {
          product.sizes.forEach((sizeDetail) => {
            formattedCart.push({
              _id: product.itemId,
              name: product.name,
              price: product.price,
              image: product.image,
              size: sizeDetail.size,
              quantity: sizeDetail.quantity,
            });
          });
        });
  
        setCart(formattedCart);
        
       
        
        
      } else {
        console.error("Error fetching cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };
  const removeFromCart = async (itemId, size) => {
    if (!userId) {
      console.warn("No userId found; cannot remove item from cart");
      return { success: false };
    }
  
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/remove`,
        { userId, itemId, size },
        { headers: { token } } // ✅ Send token
      );
  
      console.log("Remove from Cart API Response:", response.data);
  
      if (response.data.success) {
        await fetchCart(); // ✅ Fetch updated cart from DB
      }
  
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error.message);
      return { success: false };
    }
  };
  
  // const removeFromCart = async (itemId, size) => {
  //   if (!userId) {
  //     console.warn("No userId found; cannot remove item from cart");
  //     return;
  //   }

  //   setCart((prevCart) =>
  //     prevCart.filter((item) => !(item._id === itemId && item.size === size))
  //   );

  //   try {
  //     await axios.post(`${backendUrl}/api/cart/remove`, { userId, itemId, size });
  //   } catch (error) {
  //     console.error("Error removing from cart:", error.message);
  //   }
  // };

  const getProductsData = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token, setToken]);
  
 

  useEffect(() => {
    if (!userId) {
      initializeUserId(); // Set userId whenever the token changes
    }
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("Fetching cart for userId:", userId);
      fetchCart(); // Fetch the cart when the userId is available
    }
  }, [userId]);

  useEffect(() => {
    getProductsData(); // Fetch product data on initial load
  }, []);

  const value = {
    products,
    cart,
    currency,
    delivery_fee,
    orders,
    addToCart,
    removeFromCart,
    fetchCart,
    setToken,
    token,
    userId,
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;


  // const decodeToken = (token) => {
  //   try {
  //     const base64Url = token.split(".")[1];
  //     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split("")
  //         .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
  //         .join("")
  //     );
  //     return JSON.parse(jsonPayload);
  //   } catch (error) {
  //     console.error("Error decoding token:", error.message);
  //     return null;
  //   }
  // };


  

  // const initializeUserId = () => {
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     const decoded = decodeToken(storedToken);
  //     //igiwehkcsa=========
  //     setUserId(decoded?.userId || null); // Adjust based on your JWT payload structure
  //   } else {
  //     setUserId(null); // Clear userId if no token is found
  //   }
  // };