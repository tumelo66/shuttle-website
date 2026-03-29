import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Booking } from '@/models/Booking'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
    try {
        const token = getTokenFromRequest(request)
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const decoded = verifyToken(token)
        if (!decoded || typeof decoded === 'string') {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        await connectDB()

        const bookings = await Booking.find({ user: (decoded as any).id })
            .populate('shuttle schedule')
            .sort({ createdAt: -1 })

        return NextResponse.json(bookings)
    } catch (error) {
        console.error('Get bookings error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = getTokenFromRequest(request)
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const decoded = verifyToken(token)
        if (!decoded || typeof decoded === 'string') {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        await connectDB()

        const { shuttleId, scheduleId, seat } = await request.json()

        // Check if seat is already booked
        const existingBooking = await Booking.findOne({
            shuttle: shuttleId,
            schedule: scheduleId,
            seat,
            status: { $ne: 'cancelled' },
        })

        if (existingBooking) {
            return NextResponse.json(
                { error: 'Seat already booked' },
                { status: 400 }
            )
        }

        const booking = await Booking.create({
            user: (decoded as any).id,
            shuttle: shuttleId,
            schedule: scheduleId,
            seat,
        })

        return NextResponse.json(booking, { status: 201 })
    } catch (error) {
        console.error('Create booking error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
