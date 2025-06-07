import { NavLink } from 'react-router-dom';
import {
    ChartPieIcon,
    ArrowsRightLeftIcon,
    UsersIcon,
    ArchiveBoxIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

export default function SideNavBar() {
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: ChartPieIcon },
        { path: '/transactions', label: 'Transactions', icon: ArrowsRightLeftIcon },
        { path: '/customers', label: 'Customers', icon: UsersIcon },
        { path: '/products', label: 'Products', icon: ArchiveBoxIcon },
        { path: '/staff', label: 'Staff', icon: UserGroupIcon },
    ];
    return (
        <aside className="bg-black text-white w-60 md:w-64 px-6 h-screen py-4 fixed flex flex-col">
            {/* Logo Section - diambil dari kode pengguna */}
            <div className="flex items-center justify-center mb-1 gap-4"> {/* Menambahkan px-4 untuk padding horizontal */}
                <img
                    src="/logo2.png" // Pastikan path logo ini benar dan ada di folder public
                    alt="Logo Olla"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px]" // Menambahkan kelas untuk ukuran eksplisit jika diperlukan
                />
            </div>

            {/* Navigation Links - Menggunakan navItems dan NavLink dengan HeroIcons */}
            <nav className="flex-grow w-full px-2"> {/* flex-grow agar mengambil sisa ruang, w-full dan px-2 untuk styling */}
                <ul className="flex flex-col gap-4"> {/* Mengubah gap-8 menjadi gap-2 atau sesuai kebutuhan */}
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-6 items-center py-3 rounded-lg font-bold text-sm transition-colors duration-150 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50
                        ${isActive
                                        ? 'bg-white text-black shadow-lg' // Kelas untuk link aktif (sesuai contoh pengguna)
                                        : 'text-slate-200 hover:bg-gray-800 hover:text-white' // Kelas untuk link non-aktif
                                    }`
                                }
                            >
                                <item.icon className="h-5 w-5" aria-hidden="true" />
                                <p>{item.label}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Optional: Footer bisa ditambahkan di sini jika diperlukan */}
            <div className="p-4 mt-auto text-center w-full">
                <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Olla Inc.</p>
            </div>
        </aside>
    )
}