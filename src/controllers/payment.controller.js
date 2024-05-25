import { Payment } from "../models/payment.models.js";
import APIResponse from '../utils/APIResponse.js'
import APIError from '../utils/APIError.js'


const processPayment = async(req,res)=>{
    try {
        const userId = req.user._id;
        // const {orderId, amount, transactionId, paymentMode, status} = req.body;
        const {order, amount} = req.body;

        const payment = await Payment.create({
            order: order,
            user: userId,
            status: 'Completed',
            // transactionId,
            amount,
            paymentMode: 'Cash'
        });

        if(!payment) throw new APIError('Payment is not Processed', payment);

        return res.status(200)
        .json(new APIResponse('Payment Processed', ))
    } catch (error) {
        console.log(error);
    }
}

const getAllPayments = async(req,res)=>{
    try {
        const allPayments = await Payment.find();

        if(!allPayments.length>0) throw new APIError('No Payment are present');
        return res.status(200)
        .json(new APIResponse('All Payment Details', allPayments))
    } catch (error) {
        console.log(error);
    }
}

const getPaymentById = async(req,res)=>{
    try {
        const paymentId = req.params.id;

        if(!paymentId) throw new APIError('NO Payment ID is Present');

        const paymentDetails = await Payment.findById(paymentId);

        if(!paymentDetails) throw new APIError('No Payment Details');

        return res.status(200)
        .json(new APIResponse('Payment Details', paymentDetails))
    } catch (error) {
        console.log(error);
    }
}

const getPaymentByOrder = async (req,res)=>{
    try {
        const orderId = req.params.id;

        if(!orderId) throw new APIError('No OrderId');

        const paymentDetailsOrder = await Payment.find({order: orderId});

        if(!paymentDetailsOrder) throw new APIError('NO Payment Details');

        return res.status(200)
        .json(new APIResponse('Payment Details', orderId))
    } catch (error) {
        console.log(error);
    }
}

const updatePaymentStatus = async (req,res)=>{
    try {
        const paymentId = req.params.id;

        const {status} = req.body;

        if(!paymentId) throw new APIError('NO Payment ID is Present');

        const paymentDetails = await Payment.findByIdAndUpdate(
            paymentId,
            {
                status
            },
            {
                new: true
            }
        );

        if(!paymentDetails) throw new APIError('No Payment Details');

        return res.status(200)
        .json(new APIResponse('Payment Details', paymentDetails));

    } catch (error) {
        console.log(error);
    }
}

export {
    processPayment,
    getAllPayments,
    getPaymentById,
    getPaymentByOrder,
    updatePaymentStatus
}