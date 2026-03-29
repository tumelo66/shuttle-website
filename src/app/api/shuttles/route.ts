import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Shuttle } from '@/models/Shuttle'
import { Schedule } from '@/models/Schedule'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const shuttles = await Shuttle.find({ status: 'active' }).populate(
            'route'
        )

        const schedules = await Schedule.find({
            status: { $in: ['scheduled', 'in-progress'] },
        }).populate('shuttle route')

        return NextResponse.json({
            shuttles,
            schedules,
        })
    } catch (error) {
        console.error('Get shuttles error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const { shuttleId, name, capacity, routeId, driver } =
            await request.json()

        const shuttle = await Shuttle.create({
            shuttleId,
            name,
            capacity,
            route: routeId,
            driver,
        })

        return NextResponse.json(shuttle, { status: 201 })
    } catch (error) {
        console.error('Create shuttle error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
