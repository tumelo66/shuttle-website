export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Shuttle Tracker
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Real-time shuttle tracking, scheduling, and booking for students
                    </p>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="/login"
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Sign In
                        </a>
                        <a
                            href="/signup"
                            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-3xl mb-2">📍</div>
                        <h3 className="text-lg font-semibold mb-2">Live Tracking</h3>
                        <p className="text-gray-600">
                            Track shuttles in real-time with GPS-enabled maps
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-3xl mb-2">📅</div>
                        <h3 className="text-lg font-semibold mb-2">Schedule & Book</h3>
                        <p className="text-gray-600">
                            Check schedules and book your seat ahead of time
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-3xl mb-2">🔐</div>
                        <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
                        <p className="text-gray-600">
                            Student authentication with secure encryption
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
