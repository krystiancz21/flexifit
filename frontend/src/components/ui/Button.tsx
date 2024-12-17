type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick?: () => void
  fullWidth?: boolean
  className?: string
}

export default function Button({
  type = 'button',
  children,
  onClick,
  fullWidth = false,
  className = ''
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 font-semibold transition-all duration-200 ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  )
} 