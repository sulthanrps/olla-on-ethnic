import { NavLink } from 'react-router-dom';
import {
    ChartPieIcon,
    ArrowsRightLeftIcon,
    UsersIcon,
    ArchiveBoxIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function SideNavBar() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            const token = localStorage.getItem('authToken');
            if (token){
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            }
        } catch (error) {
            console.error("Token tidak valid:", error);
        }
    }, [])


    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: ChartPieIcon },
        { path: '/transactions', label: 'Transactions', icon: ArrowsRightLeftIcon },
        { path: '/customers', label: 'Customers', icon: UsersIcon },
        { path: '/products', label: 'Products', icon: ArchiveBoxIcon },
        { path: '/staff', label: 'Staff', icon: UserGroupIcon },
    ];
    return (
        <aside className="bg-black text-white w-60 md:w-64 px-6 h-screen py-4 fixed flex flex-col">
            <div className="flex items-center justify-center mb-1 gap-4"> 
                <img
                    src="/logo2.png" 
                    alt="Logo Olla"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px]" 
                />
            </div>

            <nav className="flex-grow w-full px-2"> 
                <ul className="flex flex-col gap-4"> 
                    {navItems.map((item, index) => {
                        if(item.path === '/staff' && user?.nama !== 'Ola') {
                            return null;
                        }
                        return (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 px-6 items-center py-3 rounded-lg font-bold text-sm transition-colors duration-150 ease-in-out
                                            focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50
                                            ${isActive
                                            ? 'bg-white text-black shadow-lg'
                                            : 'text-slate-200 hover:bg-gray-800 hover:text-white'
                                        }`
                                    }
                                >
                                    <item.icon className="h-5 w-5" aria-hidden="true" />
                                    <p>{item.label}</p>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-4 mt-auto text-center w-full">
                <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Olla Inc.</p>
            </div>
        </aside>
    )
}