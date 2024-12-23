import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

const app=express()
const port =process.env.PORT || 5000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter )
app.use('/api/product',productRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /api/user or /api/product endpoints.');
  });



app.listen(port,()=> console.log('Server on port '+port))