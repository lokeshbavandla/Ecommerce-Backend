import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    createOrder,
    getAllOrders,
    getUserOrderDetails,
    getOrderById,
    updateOrderStatus,
    cancelOrder
} from '../controllers/order.controller.js'

const router = Router();

router.route('/create').post(verifyJWT, createOrder);
router.route('/getallOrders').get(verifyJWT, getAllOrders);
router.route('/getUserOrder').get(verifyJWT, getUserOrderDetails);
router.route('/getorderbyId/:id').get(verifyJWT, getOrderById);
router.route('/update').patch(verifyJWT, updateOrderStatus);
router.route('/cancel/:id').delete(verifyJWT, cancelOrder);

export default router;