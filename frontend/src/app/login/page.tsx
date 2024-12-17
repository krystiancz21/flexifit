'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from '@/lib/axios'
import FormInput from '@/components/ui/FormInput'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/v1/auth/authenticate', formData)
      
      if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken)
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Nieprawidłowy email lub hasło')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Zaloguj się
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <FormInput
              id="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="twoj@email.com"
            />
            <FormInput
              id="password"
              type="password"
              label="Hasło"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" fullWidth>
            Zaloguj się
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Nie masz jeszcze konta?{' '}
              <Link href="/register" className="font-semibold text-purple-600 hover:text-purple-500">
                Zarejestruj się
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
