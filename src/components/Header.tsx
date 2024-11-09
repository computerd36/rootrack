
import { FaPlus } from 'react-icons/fa';
import RoobetLogo from '../../public/android-chrome-384x384.png';
import { Button } from './UI/Button';
import { Link } from 'react-router-dom';

export default function Header() {




    return (
        <div className="w-full">
            <div className="m-8 px-2 py-2 rounded-2xl flex items-center justify-between">
                <div className='flex items-center justify-center gap-4'>
                    <img src={RoobetLogo} className='h-10 rounded-xl border-2 border-yellow-400' />
                    <h1 className='text-4xl text-yellow-400 leading-none'>Rootrack</h1>
                </div>

                <div className='w-full flex items-center justify-center md:gap-8 xl:gap-24 2xl:gap-48 max-w-[800px] collapse md:visible'>
                    <Link to='/' className='text-2xl text-yellow-400 hover:text-yellow-300'>FAQ</Link>
                    <Link to='/' className='text-2xl text-yellow-400 hover:text-yellow-300'>Repository</Link>
                    <Link to='/' className='text-2xl text-yellow-400 hover:text-yellow-300'>Help</Link>
                </div>

                <Button
                    text='Create Insights'
                    icon={<FaPlus />}
                    size='xl'
                    ariaLabel='Create Insights'
                    onClick={() => { }}
                />
            </div>
        </div>
    );
}
