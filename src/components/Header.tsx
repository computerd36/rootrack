
import {
    MegaMenu,
    NavbarBrand,
    NavbarCollapse,
    NavbarToggle
} from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    return (
        <MegaMenu className='bg-indigo-950 border-b-2 border-yellow-300'>
            <div className="mx-auto flex w-full flex-wrap items-center justify-between p-4 md:space-x-8">
                <NavbarBrand onClick={() => navigate('/')} className='flex gap-2 cursor-pointer'>
                    <img src="/android-chrome-192x192.png" alt="Rootrack Logo" className="h-8 rounded-lg border-2 border-yellow-300" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-yellow-300">Rootrack</span>
                </NavbarBrand>
                <div className="order-2 hidden items-center md:flex">
                    <Link
                        to="/form"
                        className="text-yellow-300 bg-indigo-950 hover:bg-indigo-900 font-2xl font-semibold px-6 py-2 rounded-xl inline-flex items-center border-2 border-yellow-300"
                    >
                        Create Insights
                        <HiOutlineArrowRight className="ml-2 h-6 w-6" />
                    </Link>
                </div>
                <NavbarToggle />
                <NavbarCollapse>
                    <Link to="/faq" className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                        aria-label="Navigate to FAQ">
                        FAQ
                    </Link>

                    <a
                        href="https://github.com/computerd36/rootrack"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                        aria-label="Navigate to the GitHub repository"
                    >
                        Repository
                    </a>

                    <a
                        href="mailto:mail@36it.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                        aria-label="Send an email to the developer"
                    >
                        Contact
                    </a>
                </NavbarCollapse>
            </div>
        </MegaMenu>
    );
}
