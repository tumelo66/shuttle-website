import mongoose from 'mongoose'

const shuttleSchema = new mongoose.Schema(
    {
        shuttleId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            default: 40,
        },
        currentLocation: {
            latitude: Number,
            longitude: Number,
            updatedAt: {
                type: Date,
                default: Date.now,
            },
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'maintenance'],
            default: 'active',
        },
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Route',
        },
        driver: String,
        passengers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
)

export const Shuttle =
    mongoose.models.Shuttle || mongoose.model('Shuttle', shuttleSchema)
