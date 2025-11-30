'use client'

import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon, User, Menu, Bell, Search } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function Navbar({ onMenuToggle }) {
  const { theme, toggleTheme } = useTheme()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notificationsRef = useRef(null)
  const profileRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 right-0 z-30">
      <div className="flex h-14 items-center px-4 sm:px-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuToggle}
            className="rounded-md p-2 hover:bg-accent transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <span className="text-xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ToDo
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, tasks, or team..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="rounded-lg p-2 hover:bg-accent transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-accent rounded-md cursor-pointer">
                    <p className="text-sm font-medium">New project assigned</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-accent rounded-md cursor-pointer">
                    <p className="text-sm font-medium">Task completed</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-accent rounded-md cursor-pointer">
                    <p className="text-sm font-medium">Team meeting scheduled</p>
                    <p className="text-xs text-muted-foreground">6 hours ago</p>
                  </div>
                </div>
                <div className="p-2 border-t border-border">
                  <button className="w-full text-center text-sm text-primary hover:text-primary/80 py-2">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-40">
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                    Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors text-red-600">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}