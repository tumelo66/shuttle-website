import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema(
    {
        shuttle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shuttle',
            required: true,
        },
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Route',
            required: true,
        },
        departureTime: {
            type: Date,
            required: true,
        },
        estimatedArrivalTime: {
            type: Date,
            required: true,
        },
        actualArrivalTime: Date,
        seatsAvailable: {
            type: Number,
            default: 40,
        },
        status: {
            type: String,
            enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
            default: 'scheduled',
        },
    },
    {
        timestamps: true,
    }
)

export const Schedule =
    mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema)
