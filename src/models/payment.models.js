import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        },
        amount: {
            type: Number,
        },
        paymentMode: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            default: 'Pending'
        },
        transactionId: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

export const Payment = model('Payment', paymentSchema)