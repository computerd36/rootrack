
import { FaPlus } from 'react-icons/fa';
import RoobetLogo from '../assets/rootrack_logo.svg';
import { Button } from './UI/Button';
import { Link } from 'react-router-dom';

export default function Header() {




    return (
        <div className="w-full">
            <div className="m-8 px-2 py-2 rounded-2xl flex items-center justify-between">
                <Link
                    to={'/'}
                    aria-label='Rootrack Logo (Go to homepage)'
                    className='flex items-center justify-center gap-4'>
                    <img src={RoobetLogo} className='h-10 rounded-xl' aria-label='Logo of Rootrack'/>
                    <h1 className='text-4xl text-yellow-300 leading-none'>Rootrack</h1>
                </Link>

                <div className='w-full flex items-center justify-center md:gap-8 xl:gap-24 2xl:gap-48 max-w-[800px] collapse md:visible'>
                    <Link to='/faq' className='text-2xl text-yellow-400 hover:text-yellow-300'>FAQ</Link>
                    <Link to='https://github.com/computerd36/rootrack' className='text-2xl text-yellow-400 hover:text-yellow-300' target='_blank'>Repository</Link>
                    <Link to='/' className='text-2xl text-yellow-400 hover:text-yellow-300'>About</Link>
                </div>

                <div className='flex gap-2'>

                    {/* <Button
                        icon={<FaHistory />}
                        size='xl'
                        ariaLabel='Load last'
                        onClick={() => { }}
                    >History</Button> */}

                    <Button
                        icon={<FaPlus />}
                        size='xl'
                        ariaLabel='Create new insight'
                        linkTo='/form'
                    >Create New</Button>
                </div>
            </div>
        </div>
    );
}
