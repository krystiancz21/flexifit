'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from '@/lib/axios'
import FormInput from '@/components/ui/FormInput'
import Button from '@/components/ui/Button'

const validateFirstName = (name: string) => {
  const regex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/;
  if (!name) return 'Imię jest wymagane';
  if (!regex.test(name)) return 'Imię może zawierać tylko litery';
  return '';
};

const validateLastName = (name: string) => {
  const regex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+([ '-][A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+)*$/;
  if (!name) return 'Nazwisko jest wymagane';
  if (!regex.test(name)) return 'Nazwisko może zawierać tylko litery oraz spacje lub myślniki';
  return '';
};

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email jest wymagany';
  if (!regex.test(email)) return 'Podaj prawidłowy adres email';
  return '';
};

const validatePassword = (password: string) => {
  if (!password) return 'Hasło jest wymagane';
  if (password.length < 4) return 'Hasło powinno mieć co najmniej 4 znaki';
  return '';
};

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors = {
      firstname: validateFirstName(formData.firstname),
      lastname: validateLastName(formData.lastname),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword ? 'Hasła nie są identyczne' : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('/api/v1/auth/register', {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password
      })

      // if (response.status === 201) {
      router.push('/login')
      // }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Wystąpił błąd podczas rejestracji')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Zarejestruj się
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
              id="firstname"
              type="text"
              label="Imię"
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
              placeholder="Jan"
              error={errors.firstname}
            />
            <FormInput
              id="lastname"
              type="text"
              label="Nazwisko"
              value={formData.lastname}
              onChange={(e) => setFormData({...formData, lastname: e.target.value})}
              placeholder="Kowalski"
              error={errors.lastname}
            />
            <FormInput
              id="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="jan.kowalski@example.com"
              error={errors.email}
            />
            <FormInput
              id="password"
              type="password"
              label="Hasło"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
              error={errors.password}
            />
            <FormInput
              id="confirmPassword"
              type="password"
              label="Potwierdź hasło"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="••••••••"
              error={errors.confirmPassword}
            />
          </div>

          <Button type="submit" fullWidth>
            Zarejestruj się
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Masz już konto?{' '}
              <Link href="/login" className="font-semibold text-purple-600 hover:text-purple-500">
                Zaloguj się
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}