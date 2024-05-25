import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    processPayment,
    getAllPayments,
    getPaymentById,
    getPaymentByOrder,
    updatePaymentStatus
} from '../controllers/payment.controller.js'

const router = Router();

router.route('/create').post(verifyJWT, processPayment);
router.route('/getallpayments').get(verifyJWT, getAllPayments);
router.route('/getUserOrderPayment').get(verifyJWT, getPaymentByOrder);
router.route('/getorderbyId/:id').get(verifyJWT, getPaymentById);
router.route('/update').patch(verifyJWT, updatePaymentStatus);

export default router;