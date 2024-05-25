import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors(
    // {
    //     origin: process.env.CORS,
    //     credentials: true
    // }
))
app.use(cookieParser())

//Routes Import

import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import discountRouter from './routes/discount.routes.js'
import orderRouter from './routes/orders.routes.js'
import paymentRouter from './routes/payment.routes.js'



//Routes Declaration

app.use('/api/v1/user', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/discount', discountRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/payments', paymentRouter)






export default app;