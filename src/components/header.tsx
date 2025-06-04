interface HeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function Header({ title, subtitle, className = "" }: HeaderProps) {
  return (
    <div className={`text-center mt-6 mb-12 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          {title}
        </span>
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            {subtitle}
          </span>
        </p>
      )}
    </div>
  )
}
