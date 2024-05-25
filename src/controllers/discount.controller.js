import { Discount } from "../models/discount.models.js";
import APIError from '../utils/APIError.js'
import APIResponse from '../utils/APIResponse.js'


const createDiscount = async(req,res)=>{
    try {
        const {code, discountType, value} = req.body;

        const discount = await Discount.create({
            code,
            discountType,
            value
        });

        if(!discount) throw new APIError('Discount Not Entered in DB');

        return res.status(200)
        .json(new APIResponse('Discount Created', discount))
    } catch (error) {
        console.log(error);
    }
}

const getAllDiscounts = async(req,res)=>{
    try {

        const allDiscounts = await Discount.find();

        if(!allDiscounts.length>0) throw new APIError('No Discounts');

        return res.status(200)
        .json(new APIResponse('All Discounts', allDiscounts));

    } catch (error) {
        console.log(error);
    }
}

const getDiscountById = async(req,res)=>{
    try {
        const discountId = req.params.id;

        if(!discountId) throw new APIError('No discount Id');

        const discountDetails = await Discount.findById(discountId);

        if(!discountDetails) throw new APIError('No Discount Coupon is Present');

        return res.status(200)
        .json(new APIResponse('Discount Details', discountDetails));
    } catch (error) {
        console.log(error);
    }
}

const updateDiscountById = async(req,res)=>{
    try {
        const discountId = req.params.id;
        const {code, discountType, value} = req.body;

        const discountDetails = await findByIdAndUpdate(discountId,
            {
                code,
                discountType,
                value
            },
            {
                new: true
            }
        );

        if(!discountDetails) throw new APIError('No discount coupon found');

        return res.status(200)
        .json(new APIResponse('updated Discount Details', discountDetails))
    } catch (error) {
        console.log(error);
    }
}

const deleteDiscountById = async (req,res)=>{
    try {
        const discountId = req.params.id;

        if(!discountId) throw new APIError('No discount Id');

        const discountDetails = await Discount.findByIdAndDelete(req.params.id);

        if(!discountDetails) throw new APIError('No discount found');

        return res.status(200)
        .json(new APIResponse('Discount Coupon Deleted'))
        
    } catch (error) {
        console.log(error);
    }
}

const getDiscountByCode = async(req,res)=>{
    try {
        const {code} = req.body;

        if(!code) throw new APIError('No discount Id');

        const discountDetails = await Discount.find({code});

        if(!discountDetails) throw new APIError('No Discount Coupon is Present');

        return res.status(200)
        .json(new APIResponse('Discount Details', discountDetails));
    } catch (error) {
        console.log(error);
    }
}

export {
    createDiscount,
    getAllDiscounts,
    getDiscountById,
    updateDiscountById,
    deleteDiscountById,
    getDiscountByCode
}