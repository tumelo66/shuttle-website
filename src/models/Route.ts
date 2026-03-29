import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: String,
        waypoints: [
            {
                name: String,
                latitude: Number,
                longitude: Number,
                stopOrder: Number,
            },
        ],
        distance: Number,
        estimatedDuration: Number,
        frequency: {
            type: String,
            enum: ['hourly', 'every-30-mins', 'on-demand'],
            default: 'hourly',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Route =
    mongoose.models.Route || mongoose.model('Route', routeSchema)
