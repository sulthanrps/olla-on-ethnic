import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <header className="bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 mb-6 text-center">
          Selamat Datang di Dunia Tailwind CSS!
        </h1>
        <p className="text-gray-800 text-lg text-center mb-8 max-w-lg mx-auto">
          Bangun antarmuka pengguna yang indah dan responsif dengan cepat menggunakan utility-first framework ini.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1">
            Mulai Sekarang
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300 transform hover:-translate-y-1">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </header>
    </div> 
    </>
  )
}

export default App
