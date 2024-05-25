import { Schema, model } from "mongoose";

const discountSchema = new Schema(
    {
        code: {
            type: String,
            required: true
        },
        discountType: {
            type: String,
            enum: ['Percentage', 'Fixed'],
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        description:{
            type: String,
        },
        active: {
            type: Boolean,
            default: true
        },
        discountExpiry: {
            type: Date
        },
        usageLimit: {
            type: Number
        },
        usageCount: {
            type: Number
        },
        minimumAmount: {
            type: Number
        },
        maximumDiscount: {
            type: Number
        },
        stackable:{
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

export const Discount = new model('Discount', discountSchema)