import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },

        mrp: {
            type: Number,
            required: true
        },
        discount:{
            type: Number,
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category'
            }
        ],
        images: [
            {
                type: String,
                required: true
            }
        ],
        qty: {
            type: Number,
            required: true  
        },
        rating:{
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    },
    {
        timestamps: true
    }
)

export const Product = model('Product', productSchema )