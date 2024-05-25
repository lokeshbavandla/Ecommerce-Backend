import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending'
        },
        totalPrice: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
        },
        contact: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

export const Order = model('Order', orderSchema)