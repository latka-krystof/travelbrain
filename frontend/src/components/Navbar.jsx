import { NavLink, Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

import { useContext, useState } from 'react';
import { AuthContext } from '../context/context';

function Navbar() {

    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
     <nav className='py-10 mb-4 flex justify-between font-dmsans'>
        <ul className='items-center hidden md:flex'>
            <li className='cursor-pointer text-xl shadow-black-b hover:opacity-80'>
                <NavLink to='/'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >Home</NavLink>
            </li>
            <li className='cursor-pointer text-xl ml-8 hover:opacity-80'>
                <NavLink to='/register'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >Register</NavLink>
            </li>
            <li className='cursor-pointer text-xl ml-8 hover:opacity-80'>
                <NavLink to='/login'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >Login</NavLink>
            </li>
            {!isLoggedIn() ? ( <></>) : (
            <li className='cursor-pointer text-xl ml-8 hover:opacity-80'>
                <NavLink to='/#'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >Plan my trip</NavLink>
            </li>)}
        </ul>

        <ul className='flex items-center'>
            <li>
                {!isLoggedIn() ? (
                    <Link to='/login' className='hover:opacity-80 bg-gradient-to-br text-black px-4 py-2 rounded-md ml-8'>
                    Log in
                    </Link>
                ) : (
                    <Link onClick={logout} className='hover:opacity-80 bg-gradient-to-br text-black px-4 py-2 rounded-md ml-8'>
                    Log out
                    </Link>
                )}
            </li>
        </ul>
     </nav>
    )
  }
  
  export default Navbar