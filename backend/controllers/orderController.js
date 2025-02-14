import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js"


const placeOrder= async(req,res)=>{

    try {
        const { userId, items, amount, address, paymentMethod } = req.body;
    
        // Validate request data
       
        if (!userId || !items || items.length === 0 || !amount || !address) {
            
          return res.status(400).json({ success: false, message: "Invalid order details" });
        }
    
        // Create order data
        const orderData = {
          userId,
          items,
          amount,
          address,
          paymentMethod,
          payment: paymentMethod === "COD" ? false : true, // Payment status depends on method
          date: Date.now(),
          status: "Order Placed",
        };
    
        // Save new order in DB
        const newOrder = new orderModel(orderData);
        await newOrder.save();
      
      await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } }, { new: true });

        res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
    
      } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ success: false, message: error.message });
      }

}

const placeOrderStripe= async(req,res)=>{
    
}

const placeOrderRazorpay= async(req,res)=>{
    
}

const allOrders= async(req,res)=>{
    try {
        //const orders = await orderModel.find().sort({ date: -1 });
        let orders = await orderModel.find()
        .sort({ date: -1 })
        .lean(); // Converts Mongoose objects to plain JSON
      
      for (let order of orders) {
        for (let item of order.items) {
          const product = await productModel.findById(item.itemId).lean();
          if (product) {
            item.name = product.name;
            item.image = product.image[0]; // First image
            item.price = product.price;
          }
        }
      }

        res.json({ success: true, orders });
      } catch (error) {
        console.error("Fetch All Orders Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
      }
}



const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

   // let orders = await orderModel.find({ userId }).sort({ date: -1 }); // 🔹 Convert to plain objects
   let orders = await orderModel.find({ userId })
  .sort({ date: -1 })
  .lean(); // Converts Mongoose objects to plain JSON

for (let order of orders) {
  for (let item of order.items) {
    const product = await productModel.findById(item.itemId).lean();
    if (product) {
      item.name = product.name;
      item.image = product.image[0]; // First image
      item.price = product.price;
    }
  }
}
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch User Orders Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};



// const updateStatus= async(req,res)=>{
    
// }
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};


export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}