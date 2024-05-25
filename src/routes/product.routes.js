import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    addProduct,
    deleteProduct,
    getProduct,
    getProductsByCategory,
    updateProduct,
    sortByPrice,
    getProducts,
    // getProductsByCategories
} from '../controllers/product.controller.js'

const router = Router();

router.route('/add').post(verifyJWT, addProduct);
router.route('/delete/:id').delete(verifyJWT, deleteProduct);
router.route('/product/:id').get(getProduct);
router.route('/category/:id').get(getProductsByCategory);
router.route('/getallproducts').get(getProducts);
router.route('/update/:id').post(verifyJWT, updateProduct);
router.route('/sortbyprice').get(sortByPrice);

// router.route('/categorie').get(getProductsByCategories);






export default router;