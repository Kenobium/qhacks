import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <Image
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                width={60}
                height={60}
                className="m-2 rounded-full"
            />
            <Link href={"/"} className="btn btn-ghost text-xl">
                Home
            </Link>
            <Link href={"/about"} className="btn btn-ghost text-xl">
                What We Tried
            </Link>
            <Link href={"/rng"} className="btn btn-ghost text-xl">
                Random Generator
            </Link>
        </div>
    );
}
