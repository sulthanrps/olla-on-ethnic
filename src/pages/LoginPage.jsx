import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import useAuth from '../hooks/useAuth';
import { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <AuthLayout
            title="WELCOME BACK"
            subtitle="Welcome back! Please enter your details."
        >
            <Toaster position="top-right"/>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input id="username" name="username" type="text" required value={formData.username} onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>
                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900">
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
            </form>
            <p className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up for free!</Link>
            </p>
        </AuthLayout>
    );
}