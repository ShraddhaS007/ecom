import userModel from "../models/userModel.js";


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
    
        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: [] });
    
        res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
    
      } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ success: false, message: error.message });
      }
//     try{
//     const {userId,items,amount,address}=req.body;
//     const orderData={
//         userId,
//         items,
//         address,
//         amount,
//         paymentMethod:"COD",
//         payment:false,
//         date:Date.now()
//     }
//      const newOrder=new orderModel(orderData)
//      await newOrder.save()

//      await userModel.findByIdAndUpdate(userId,{cartData:{}})

//      res.json({success:true,message:"Order Placed"})

// }catch(error){
//     console.log(error)
//     res.json({success:false,message:error.message})
// }
}

const placeOrderStripe= async(req,res)=>{
    
}

const placeOrderRazorpay= async(req,res)=>{
    
}

const allOrders= async(req,res)=>{
    try {
        const orders = await orderModel.find().sort({ date: -1 });
        res.json({ success: true, orders });
      } catch (error) {
        console.error("Fetch All Orders Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
      }
}

const userOrders= async(req,res)=>{
    try {
        const { userId } = req.body;
    
        if (!userId) {
          return res.status(400).json({ success: false, message: "User ID is required" });
        }
    
        const orders = await orderModel.find({ userId }).sort({ date: -1 });
    
        res.json({ success: true, orders });
      } catch (error) {
        console.error("Fetch User Orders Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
      }
}
const updateStatus= async(req,res)=>{
    
}

export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}