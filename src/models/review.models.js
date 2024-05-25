import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        imageUrl:{
            type: String,
            default: ''
        },
        rating:{
            type: Number,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Review = model('Review', reviewSchema)