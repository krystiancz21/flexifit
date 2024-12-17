'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import { useAuth } from '@/hooks/useAuth'

export default function Navigation() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useAuth()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserEmail(decoded.sub || 'Użytkowniku')
      } catch (error) {
        console.error('Błąd podczas dekodowania tokenu:', error)
        setUserEmail('Użytkowniku')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    router.push('/login?sessionExpired=true')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
              FlexiFit
            </Link>
          </div>

          {/* Menu dla desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              <Link href="/group-classes" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md relative group">
                Zajęcia grupowe
                <span className="absolute bottom-1 left-0 w-full h-[2px] bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link href="/tickets" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md relative group">
                Karnety
                <span className="absolute bottom-1 left-0 w-full h-[2px] bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link href="/my-reservations" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md relative group">
                Moje bilety
                <span className="absolute bottom-1 left-0 w-full h-[2px] bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            </div>
            <div className="flex items-center border-l pl-8">
              <span className="text-sm font-medium text-gray-500 mr-4">
                <span className="text-gray-900">{userEmail}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Wyloguj się
              </button>
            </div>
          </div>

          {/* Przycisk menu dla mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobilne */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/group-classes"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Zajęcia grupowe
            </Link>
            <Link
              href="/tickets"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Karnety
            </Link>
            <Link
              href="/my-reservations"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Moje bilety
            </Link>
            <div className="px-3 py-2">
              <span className="block text-gray-700 mb-2">
                {userEmail}
              </span>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 
