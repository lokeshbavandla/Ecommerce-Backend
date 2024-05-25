import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    createDiscount,
    getAllDiscounts,
    getDiscountById,
    updateDiscountById,
    deleteDiscountById,
    getDiscountByCode
} from '../controllers/discount.controller.js'

const router = Router();

router.route('/create').post(verifyJWT, createDiscount);
router.route('/getalldiscounts').get(verifyJWT, getAllDiscounts);
router.route('/getdiscount').get(verifyJWT, getDiscountById);
router.route('/getdiscountbycode').get(verifyJWT, getDiscountByCode);
router.route('/update').patch(verifyJWT, updateDiscountById);
router.route('/delete/:id').delete(verifyJWT, deleteDiscountById);

export default router;