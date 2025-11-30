'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(undefined)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // This runs only on client side after hydration
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      requestAnimationFrame(() => {
        setTheme(savedTheme)
        document.documentElement.className = savedTheme
      })
    } else {
      // Default to light theme
      requestAnimationFrame(() => {
        setTheme('light')
        document.documentElement.className = 'light'
      })
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.className = newTheme
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}