import { useState } from "react";
import logo from "../assets/logo.jpg";

interface NavbarProps {
    logout: () => void;
}

export default function Navbar({ logout }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={`${isOpen ? "w-64" : "w-20"
                } bg-white/30 backdrop-blur-md border-r border-white/20 h-screen transition-all duration-300 flex flex-col relative shadow-lg`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-3 top-10 bg-orange-500 text-white cursor-pointer rounded-full p-1 shadow-md hover:bg-orange-600 transition-colors z-50"
            >
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                )}
            </button>

            <div className="p-4 flex items-center border-b border-white/10 h-20 overflow-hidden">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <span
                    className={`ml-3 font-bold text-xl text-orange-500 cursor-default whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"
                        }`}
                >
                    Easy Generator
                </span>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-4 px-2">
                <button className="flex items-center px-4 py-3 text-orange-500 hover:bg-orange-50 hover:text-orange-600 cursor-pointer rounded-xl transition-all group">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 flex-shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                    </svg>
                    <span
                        className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"
                            }`}
                    >
                        Home
                    </span>
                </button>
            </div>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-3 text-orange-500 hover:bg-orange-50 hover:text-orange-600 cursor-pointer rounded-xl transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 flex-shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                    </svg>
                    <span
                        className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"
                            }`}
                    >
                        Logout
                    </span>
                </button>
            </div>
        </div>
    );
}
