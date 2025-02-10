import userModel from "../models/userModel.js"

import productModel from "../models/productModel.js";

// const addToCart=async(req,res)=>{
//     try {
//         const {userId,itemId,size}=req.body
//         console.log(req.body);
//         const userData=await userModel.findById(userId);
//         let cartData=await userData.cartData;

//         if(cartData[itemId]){

//             if(cartData[itemId][size]){
//                 cartData[itemId][size]+=1;
//             }else{
//                 cartData[itemId][size]=1;
//             }
//         }else{
//            cartData[itemId]={}
//            cartData[itemId][size]=1;
//         }

//         await userModel.findByIdAndUpdate(userId,{cartData});

//         res.json({success:true,message:"Added to Cart"})

//     } catch (error) {
//          console.log(error)
//          res.json({success:false,message:error.message})
//     }
// }
const addToCart = async (req, res) => {
    try {
      const { userId, itemId, size } = req.body;
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData || {};
  
      if (cartData[itemId]) {
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      } else {
        cartData[itemId] = { [size]: 1 };
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Product added to cart" });
    } catch (error) {
      console.error("Add to Cart Error:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        console.log("Received Remove Request: ", { userId, itemId, size });

        if (!userId || !itemId || !size) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId] && cartData[itemId][size]) {
            if (cartData[itemId][size] > 1) {
                cartData[itemId][size] -= 1;
            } else {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }

            await userModel.findByIdAndUpdate(userId, { cartData });

            console.log("Updated Cart Data:", cartData);

            return res.json({ success: true, message: "Removed from Cart", updatedCart: cartData });
        } else {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

//   const removeFromCart = async (req, res) => {
//     try {
//         const { userId, itemId, size } = req.body;
//         if (!userId || !itemId || !size) {
//             return res.status(400).json({ success: false, message: "Missing required fields" });
//         }

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {};

//         if (cartData[itemId] && cartData[itemId][size]) {
//             if (cartData[itemId][size] > 1) {
//                 cartData[itemId][size] -= 1;
//             } else {
//                 delete cartData[itemId][size];
//                 if (Object.keys(cartData[itemId]).length === 0) {
//                     delete cartData[itemId];
//                 }
//             }

//             await userModel.findByIdAndUpdate(userId, { cartData });

//             res.json({ success: true, message: "Removed from Cart" });
//         } else {
//             res.status(404).json({ success: false, message: "Item not found in cart" });
//         }
//     } catch (error) {
//         console.error("Error removing from cart:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


const getCart = async (req, res) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "Missing userId" });
      }
  
      // Find the user by ID
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
  
      // Fetch all products from the database for the given item IDs
      const itemIds = Object.keys(cartData);
      const products = await productModel.find({ _id: { $in: itemIds } });
  
      // Map through the cart data and attach product details
      const cartWithDetails = products.map((product) => {
        const sizes = cartData[product._id];
        return {
          itemId: product._id,
          name: product.name,
          price: product.price,
          image: product.image[0],
          sizes: Object.keys(sizes).map((size) => ({
            size,
            quantity: sizes[size],
          })),
        };
      });
      console.log("Cart data fetched:", cartWithDetails);
      res.json({ success: true, cart: cartWithDetails });
    } catch (error) {
      console.error("Error fetching cart data:", error);
      res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
  };
  
// const getCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         if (!userId) {
//             return res.status(400).json({ success: false, message: "Missing userId" });
//         }

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {};
//         console.log("Cart data fetched:", cartData); // Debug log

//         res.json({ success: true, cartData });
//     } catch (error) {
//         console.error("Error fetching cart data:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// const getCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: "Missing userId" });
//     }

//     const userData = await userModel.findById(userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     let cartData = userData.cartData || {};

//     // Fetch product details for items in the cart
//     const cartWithDetails = await Promise.all(
//       Object.keys(cartData).map(async (itemId) => {
//         const product = await productModel.findById(itemId); // Find the product details
//         if (!product) {
//           return null; // Handle the case where the product might not exist
//         }

//         const sizes = cartData[itemId];
//         return {
//           itemId,
//           name: product.name,
//           price: product.price,
//           image: product.image,
//           sizes: Object.keys(sizes).map((size) => ({
//             size,
//             quantity: sizes[size],
//           })),
//         };
//       })
//     );

//     // Filter out nulls in case of missing products
//     const filteredCart = cartWithDetails.filter((item) => item !== null);

//     res.json({ success: true, cart: filteredCart });
//   } catch (error) {
//     console.error("Error fetching cart data:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };




export {addToCart,removeFromCart,getCart}