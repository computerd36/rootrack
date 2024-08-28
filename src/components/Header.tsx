
import {
    Button,
    MegaMenu,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle
} from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    return (
        <MegaMenu className='bg-indigo-950'>
            <div className="mx-auto flex w-full flex-wrap items-center justify-between p-4 md:space-x-8">
                <NavbarBrand href="/">
                    <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-yellow-300">Rootrack</span>
                </NavbarBrand>
                <div className="order-2 hidden items-center md:flex">
                    <Button
                        color="warning"
                        onClick={() => {
                            navigate('/form')
                        }}
                        className='text-indigo-950'
                    >
                        Start process
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
                <NavbarToggle />
                <NavbarCollapse>
                    <NavbarLink href="#" className='text-white'>About</NavbarLink>
                    <NavbarLink href="#" className='text-white'>FAQ</NavbarLink>
                    <NavbarLink href="#" className='text-white'>Discord</NavbarLink>
                </NavbarCollapse>
            </div>
        </MegaMenu>
    );
}
