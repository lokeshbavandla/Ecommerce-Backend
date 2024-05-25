import APIError from '../utils/APIError.js'
import {Product} from '../models/product.models.js'
import { Order } from '../models/order.models.js';
import APIResponse from '../utils/APIResponse.js'

const createOrder = async(req,res)=>{
    try {
        const userId = req.user._id;

        const {products, address, pincode, contact, totalPrice} = req.body;

        if(!products.length>0) throw new APIError('No Products');

        // let totalPrice = 0;
        const orderProducts = [];

        for(const product of products){
            const productDetails = await Product.findById(product._id);

            if(!productDetails) throw new APIError('No Product Found');
            
            // totalPrice += productDetails.price;

            orderProducts.push({
                product: productDetails._id,
                quantity: productDetails.qty,
                price: productDetails.price,
            })
        }

        const orderDetails = await Order.create({
            user: userId,
            products: orderProducts,
            totalPrice,
            address,
            pincode,
            contact
        });

        if(!orderDetails) throw new APIError('Order is not entered in DB');

        return res.status(200)
        .json(new APIResponse('Order Created', orderDetails))
    } catch (error) {
        console.log(error);
    }
}

const getAllOrders = async(req,res)=>{
    try {
        const allOrders = await Order.find().populate('user', 'fullName');

        if(!allOrders.length>0) throw new APIError('No Orders');

        return res.status(200)
        .json(new APIResponse('All Order Details', allOrders))
    } catch (error) {
        console.log(error);
    }
}

const getUserOrderDetails = async(req,res)=>{
    try {
        const userId = req.user._id;

        const userOrderDetails = await Order.find({user: userId});

        if(!userOrderDetails) throw new APIError('No Order Details');

        return res.status(200)
        .json(new APIResponse('UserOrderDetails', userOrderDetails))
    } catch (error) {
        console.log(error);
    }
}

const getOrderById = async(req,res)=>{
    try {
        const orderId = req.params.id;

        if(!orderId) throw new APIError('No order Id');

        const orderDetails = await Order.findById(orderId).populate('products');
        if(!orderDetails) throw new APIError('No Order Details');

        return res.status(200)
        .json(new APIResponse('Order Details', orderDetails))
    } catch (error) {
        console.log(error);
    }
}

const updateOrderStatus = async(req, res)=>{
    try {
        const orderId = req.params.id;

        const {status} = req.body;

        if(!orderId) throw new APIError('No OrderId Sent');

        const orderDetails = await Order.findByIdAndUpdate(
            orderId,
            {
                status
            },
            {
                new: true
            }
        );

        if(!orderDetails) throw new APIError('Order not logged into Database');

        return res.status(200)
        .json(new APIResponse('Order Status Updated', orderDetails))
    } catch (error) {
        console.log(error);
    }
}

const cancelOrder = async(req,res)=>{
    const orderId = req.params.id;

    if(!orderId) throw new APIError('No Order Specified');

    const orderDetails = await Order.findByIdAndUpdate(
        orderId,
        {
            status: 'Cancelled'
        },
        {
            new: true
        }
    );

    if(!orderDetails) throw new APIError('Order Not Found');

    return res.status(200)
    .json(new APIResponse('Order Cancelled', orderDetails))
}

export {
    createOrder,
    getAllOrders,
    getUserOrderDetails,
    getOrderById,
    updateOrderStatus,
    cancelOrder
}