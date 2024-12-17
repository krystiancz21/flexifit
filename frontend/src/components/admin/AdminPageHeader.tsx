type AdminPageHeaderProps = {
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
}

export default function AdminPageHeader({ 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}: AdminPageHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 text-lg">
            {description}
          </p>
        </div>
        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  )
} 