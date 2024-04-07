// app/page.js
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100">
            <Image
                src="/qibit-randomness.png"
                alt="Picture depicting difference between bit and quibit"
                width={600}
                height={600}
                className="mb-10 mt-20 rounded-[100px] border border-slate-300"
            ></Image>
            <header className="mb-8 text-center">
                <h1 className="mb-8 text-6xl font-bold">
                    Quantum State Simulator
                </h1>
                <p className="text-xl text-gray-600">
                    Created By: Prajwal Moharana and Dhruv Ranganath
                </p>
            </header>

            <main className="text-center">
                <div className="flex justify-center space-x-4">
                    <Link href="/rng">
                        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
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
