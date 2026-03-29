import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { User } from '@/models/User'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const { name, email, password, studentId, phoneNumber } =
            await request.json()

        // Validate input
        if (!name || !email || !password || !studentId) {
            return NextResponse.json(
                { error: 'Please provide all required fields' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
            studentId,
            phoneNumber,
        })

        // Generate token
        const token = signToken({ id: user._id, email: user.email })

        return NextResponse.json(
            {
                message: 'User registered successfully',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    studentId: user.studentId,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
