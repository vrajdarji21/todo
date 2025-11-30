'use client'

import { CheckCircle2, XCircle, X, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const [isClosing, setIsClosing] = useState(false)

  // FIX: Define this function BEFORE the useEffect that calls it
  const handleClose = () => {
    setIsClosing(true)
    // Wait for animation to finish before unmounting (300ms matches duration-300 class)
    setTimeout(() => {
      onClose()
    }, 300) 
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  if (!message) return null

  const isSuccess = type === 'success'

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out transform ${
      isClosing ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
    }`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-sm ${
        isSuccess 
          ? 'bg-white/90 dark:bg-zinc-900/90 border-green-200 dark:border-green-900 text-green-800 dark:text-green-400' 
          : 'bg-white/90 dark:bg-zinc-900/90 border-red-200 dark:border-red-900 text-red-800 dark:text-red-400'
      }`}>
        <div className={`p-1 rounded-full ${isSuccess ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          {isSuccess ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
        </div>
        
        <p className="text-sm font-medium pr-2">{message}</p>
        
        <button 
          onClick={handleClose} 
          className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-3 w-3 opacity-60" />
        </button>
      </div>
    </div>
  )
}