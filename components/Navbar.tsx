import Link from "next/link";
import { ToggleDL } from "./ToggleDL";
import { Avatar } from "./ui/avatar";
import { AvatarMenu } from "./AvatarMenu";
import { SidebarTrigger } from "./ui/sidebar";

export default function Navbar() {
    return (
        <div className="bg-white text-black dark:bg-background dark:text-white p-4 flex justify-between items-center font-sans shadow-md shadow-gray-200 dark:shadow-gray-800 z-50 sticky top-0 left-0 right-0 px-4 sm:px-6 lg:px-12">

            <SidebarTrigger
                className="
        absolute left-4 top-1/2 -translate-y-1/2
        size-8!
        hover:bg-gray-200
        dark:hover:bg-gray-700
        hover:cursor-pointer
        [&>svg]:size-5!
    "
            />
            {/* left side brand */}
            <div className="text-lg font-semibold flex items-center ml-4">

                <Link href="/" className="flex items-center justify-center">

                    <span className="hidden text-2xl tracking-[-0.08em] font-bold md:block font-display text-logo">
                    
                        CyberMart
                    </span>
                </Link>
            </div>


            {/* right side navigation */}
            <div className="flex items-center gap-4">
                <a href="/dashboard" className="hover:underline">
                    Dashboard
                </a>
                <ToggleDL />
                <AvatarMenu />
            </div>
        </div>
    );
}