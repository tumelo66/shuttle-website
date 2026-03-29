import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        shuttle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shuttle',
            required: true,
        },
        schedule: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Schedule',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'confirmed',
        },
        seat: {
            type: Number,
            required: true,
        },
        bookingDate: {
            type: Date,
            default: Date.now,
        },
        departureTime: Date,
    },
    {
        timestamps: true,
    }
)

export const Booking =
    mongoose.models.Booking || mongoose.model('Booking', bookingSchema)
