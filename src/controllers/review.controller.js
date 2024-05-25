import { Review }from '../models/review.models.js'
import APIError from '../utils/APIError.js';
import APIResponse from '../utils/APIResponse.js';

const addReview = async(req,res)=>{
    try {
        const {rating, comment} = req.body;
        const productId = req.params.id;
        // const userId = req.user._id;

        const review = await Review.create({
            // user: userId,
            product: productId,
            rating,
            comment
        })

        return res.status(200
            .json(new APIResponse('Review', review))
        )
    } catch (error) {
        console.log(error);
    }
}

const getProductReviews = async(req,res)=>{
    try {
        const productId = req.params.id;

        const reviews = await Review.find({product: productId});

        if(!reviews) throw new APIError('No Reviews');

        return res.status(200)
        .json(new APIResponse('Reviews', reviews))
    } catch (error) {
        console.log(error);
    }
}

const deleteReview = async(req,res)=>{
    try {
        const reviewId = req.params.id;
        const review = await Review.findByIdAndDelete(reviewId);

        if(!review) throw new APIError('No Review')
        return res.status(200)
        .json(new APIResponse('Review Deleted'))
    } catch (error) {
        console.log(error);
    }
}

const updateReview = async(req,res)=>{
    try {
        const reviewId = req.params.id;
        const {rating, comment} = req.body;
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                rating,
                comment
            },
            {
                new: true
            }
        );

        if(!updatedReview) throw new APIError('No Review');

        return res.status(200)
        .json(new APIResponse('Updated Review', updatedReview))
        
    } catch (error) {
        console.log(error);
    }
}

const calculateAverageRating = async (req,res)=>{
    const productId = req.params.id;

    const reviews = await Review.find({product: productId});

    if(!reviews.length) throw new APIError('No reviews');

    let totalRating = 0;

    reviews.map((review)=> totalRating += review.rating);

    const reviewCount = reviews.length;

    const averageRating = reviewCount.length>0 ? totalRating / reviewCount : 0;

    return res.status(200)
    .json(new APIResponse('Calculated Rating', averageRating))
}

export {
    addReview,
    getProductReviews,
    deleteReview,
    updateReview,
    calculateAverageRating
}