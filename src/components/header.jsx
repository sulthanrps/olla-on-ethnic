import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth'; 

export default function Header() {
    const location = useLocation();
    const { logout } = useAuth(); 

    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            }
        } catch (error) {
            console.error("Token tidak valid:", error);
            logout();
        }
    }, [logout]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getPageName = (pathName) => {
        const path = pathName.split('/')[1];
        return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
    };

    const pageName = getPageName(location.pathname);
    const role = user?.nama === 'Ola' ? 'Admin' : 'Kasir';

    return (
        <header className="bg-white text-black w-full h-[15vh] flex items-center justify-between px-8 shadow-md">
            <h1 className="text-3xl font-bold">{pageName}</h1>
            <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-4">
                    {user && (
                        <div>
                            <p className="font-semibold text-sm text-right">{user.nama}</p>
                            <p className="text-gray-500 text-sm text-right">{role}</p>
                        </div>
                    )}
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        className="flex items-center p-2 rounded-md transition-colors"
                    >
                        <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                </div>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}