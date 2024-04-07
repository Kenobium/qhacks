// app/page.js
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <header className="mb-8 text-center">
                <h1 className="mb-8 text-6xl font-bold">
                    Generate Randomness using Quantum Computing
                </h1>
                <p className="text-xl text-gray-600">
                    Created By: Prajwal Moharana and Dhruv Ranganath
                </p>
            </header>

            <main className="text-center">
                <p className="mb-8 text-lg">
                    Collaborate with your team, track progress, and showcase
                    your projects with ease.
                </p>

                <div className="flex justify-center space-x-4">
                    <Link href="/about">
                        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
                            What We Explored
                        </button>
                    </Link>
                    <Link href="/rng">
                        <button className="rounded bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300">
                            Learn About Quantum Computing
                        </button>
                    </Link>
                </div>
            </main>

            <footer className="mt-8 text-center text-gray-500">
                &copy; {new Date().getFullYear()} Praj and Dhruv. All rights
                reserved.
            </footer>
        </div>
    );
}
