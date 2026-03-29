'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
    const [user, setUser] = useState<any>(null)
    const [shuttles, setShuttles] = useState<any[]>([])
    const [schedules, setSchedules] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user from localStorage (in production, verify token on backend)
                const token = localStorage.getItem('token')
                if (!token) {
                    router.push('/login')
                    return
                }

                // Fetch shuttles and schedules
                const response = await fetch('/api/shuttles', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setShuttles(data.shuttles)
                    setSchedules(data.schedules)
                }

                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
                setLoading(false)
            }
        }

        fetchData()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Shuttle Tracker</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-3xl font-bold text-blue-600">
                            {shuttles.length}
                        </div>
                        <p className="text-gray-600">Active Shuttles</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-3xl font-bold text-green-600">
                            {schedules.length}
                        </div>
                        <p className="text-gray-600">Scheduled Routes</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-3xl font-bold text-purple-600">→</div>
                        <p className="text-gray-600">Ready to Book</p>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Live Tracking Map</h2>
                    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Map will be displayed here</p>
                    </div>
                </div>

                {/* Schedules Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Available Schedules</h2>
                    {schedules.length === 0 ? (
                        <p className="text-gray-600">No schedules available</p>
                    ) : (
                        <div className="space-y-4">
                            {schedules.map((schedule) => (
                                <div
                                    key={schedule._id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                Route: {schedule.route?.name || 'Unknown'}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                Departure: {new Date(schedule.departureTime).toLocaleString()}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                Seats Available: {schedule.seatsAvailable}
                                            </p>
                                        </div>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
