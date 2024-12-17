import Link from 'next/link'
import { useRole } from '@/hooks/useRole'

type PageHeaderProps = {
  title: string
  description: string
  adminLink?: string // opcjonalna ścieżka do panelu admina
}

export default function PageHeader({ 
  title, 
  description, 
  adminLink 
}: PageHeaderProps) {
  const role = useRole()

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 text-lg">
            {description}
          </p>
        </div>
        {role === 'ADMIN' && adminLink && (
          <Link 
            href={adminLink}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Zarządzaj
          </Link>
        )}
      </div>
    </div>
  )
} 