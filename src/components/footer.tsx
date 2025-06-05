import { Facebook, Github, Instagram } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-3 px-4 bg-slate-950/50 backdrop-blur-sm text-slate-400 border-t border-slate-800/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Copyright with dynamic year */}
          <p className="text-xs">&copy; {currentYear} Saif Arabi. All rights reserved.</p>

          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/arabi.saif.33"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-slate-800/70 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
              aria-label="Facebook"
            >
              <Facebook className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-300" />
            </a>

            <a
              href="https://github.com/Dev-Arabi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-slate-800/70 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-300" />
            </a>

            <a
              href="https://instagram.com/arabi.saif.33"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-slate-800/70 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 group"
              aria-label="Instagram"
            >
              <Instagram className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
export { Footer }
