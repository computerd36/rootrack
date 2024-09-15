
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
        <MegaMenu className='bg-indigo-950 border-b-2'>
            <div className="mx-auto flex w-full flex-wrap items-center justify-between p-4 md:space-x-8">
                <NavbarBrand href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-yellow-300">Rootrack</span>
                </NavbarBrand>
                <div className="order-2 hidden items-center md:flex">
                    <Button
                        color="warning"
                        onClick={() => {
                            navigate('/form')
                        }}
                        className='text-white font-black'
                    >
                        Start process
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
                <NavbarToggle />
                <NavbarCollapse>
                    <NavbarLink href="/faq" className='text-white'>FAQ</NavbarLink>
                    <NavbarLink href="https://github.com/computerd36/rootrack" target='blank' className='text-white'>Repository</NavbarLink>
                    <NavbarLink href="mailto:mail@36it.de" target='blank' className='text-white'>Contact</NavbarLink>
                </NavbarCollapse>
            </div>
        </MegaMenu>
    );
}
