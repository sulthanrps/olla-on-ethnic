import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const getPageName = (pathName) => {
        switch (pathName) {
            case '/dashboard':
                return 'Dashboard';
            case '/transactions':
                return 'Transactions';
            case '/customers':
                return 'Customers';
            case '/products':
                return 'Products';
            case '/staff':
                return 'Staff';
            default:
                return 'Page Not Found';
        }
    };

    const pageName = getPageName(location.pathname);

    return (
        <div className="bg-white text-black w-full h-[15vh] flex items-center justify-between px-8 shadow-md">
            <h1 className="text-3xl font-bold">{pageName}</h1>
            <div className="flex items-center gap-4">
                <div>
                    <p className="font-[500] text-sm">Sulthan</p>
                    <p className="text-gray-500 text-sm">Admin</p>
                </div>
                <img src="/drop.png" alt="drop btn" width={8.27} height={4} />
            </div>
        </div>
    )
}