import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    addReview,
    getProductReviews,
    deleteReview,
    updateReview,
    calculateAverageRating
} from '../controllers/discount.controller.js'

const router = Router();

router.route('/add').post(verifyJWT, addReview);
router.route('/getproductReviews/:id').get(verifyJWT, getProductReviews);
router.route('/getaveragerating').get(verifyJWT, calculateAverageRating);
router.route('/update/:id').patch(verifyJWT, updateReview);
router.route('/delete/:id').delete(verifyJWT, deleteReview);

export default router;