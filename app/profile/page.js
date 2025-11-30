'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast' 
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Save,
  Eye, 
  EyeOff,
  Shield,
  Palette
} from 'lucide-react'

// Mock Profile Data (Simulates fetching Super Admin's current details)
const mockProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@superadmin.com',
  phone: '+1 123 456 7890',
  role: 'Super Admin',
  theme: 'system',
}

// Mock Notification Preferences
const mockPreferences = {
  email: true,
  inApp: true,
  systemAlerts: true,
  marketingEmails: false,
}

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [toast, setToast] = useState(null)
  
  // States for the three sections
  const [profileData, setProfileData] = useState(mockProfile)
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [notifPreferences, setNotifPreferences] = useState(mockPreferences)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({ ...prev, [name]: value }))
  }

  const handleNotifToggle = (name) => {
    setNotifPreferences(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    // Mock save logic
    console.log('Saving Profile:', profileData)
    setToast({ message: 'Profile details updated successfully!', type: 'success' })
    // In a real app, you would make an API call here
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setToast({ message: 'New passwords do not match.', type: 'error' })
      return
    }
    if (passwordForm.newPassword.length < 8) {
      setToast({ message: 'Password must be at least 8 characters.', type: 'error' })
      return
    }
    // Mock save logic: check currentPassword then update
    console.log('Changing Password for:', profileData.email)
    setToast({ message: 'Password changed successfully!', type: 'success' })
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    // In a real app, you would make an API call here
  }

  const handleSaveNotifications = (e) => {
    e.preventDefault()
    // Mock save logic
    console.log('Saving Notifications:', notifPreferences)
    setToast({ message: 'Notification preferences saved!', type: 'success' })
    // In a real app, you would make an API call here
  }
  
  return (
    <div className="min-h-screen bg-background">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        <main className="flex-1 min-h-screen transition-all duration-300"
          style={{ marginTop: '56px', width: sidebarOpen ? 'calc(100% - 256px)' : 'calc(100% - 64px)' }}>
          
          <div className="p-6 w-full space-y-8">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Profile
                </h1>
                <p className="text-muted-foreground mt-1">Manage your account details, security, and notification settings.</p>
              </div>
            </div>

            {/* --- Super Admin Profile Details --- */}
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
                <h2 className="font-semibold flex items-center gap-2 text-lg pb-2 border-b border-border">
                  <User className="h-5 w-5 text-blue-600" />
                  Super Admin Profile Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        name="name" 
                        onChange={handleProfileChange} 
                        type="text" 
                        value={profileData.name}
                        className="w-full pl-9 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        name="email" 
                        onChange={handleProfileChange} 
                        type="email" 
                        value={profileData.email}
                        className="w-full pl-9 p-2 bg-muted/50 border border-border rounded-lg text-sm text-muted-foreground cursor-not-allowed" 
                        disabled 
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed on the profile page.</p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        name="phone" 
                        onChange={handleProfileChange} 
                        type="tel" 
                        value={profileData.phone}
                        className="w-full pl-9 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" 
                        placeholder="+1 (555) 000-0000" 
                      />
                    </div>
                  </div>

                  {/* Role (Read-only) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={profileData.role}
                        className="w-full pl-9 p-2 bg-muted/50 border border-border rounded-lg text-sm text-muted-foreground cursor-not-allowed font-medium" 
                        disabled 
                      />
                    </div>
                  </div>

                  {/* Theme (Optional setting to add) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">App Theme</label>
                    <div className="relative">
                        <Palette className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select 
                            name="theme" 
                            onChange={handleProfileChange} 
                            value={profileData.theme}
                            className="w-full pl-9 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="system">System Default</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                  </div>

                </div>
                
                <div className="flex justify-end pt-4">
                  <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity">
                    <Save className="h-4 w-4" />
                    Save Details
                  </button>
                </div>

              </div>
            </form>

            {/* --- Change Password --- */}
            <form onSubmit={handleSavePassword} className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
                <h2 className="font-semibold flex items-center gap-2 text-lg pb-2 border-b border-border">
                  <Lock className="h-5 w-5 text-red-600" />
                  Change Password
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        required 
                        name="currentPassword" 
                        onChange={handlePasswordChange} 
                        value={passwordForm.currentPassword}
                        type={showCurrentPassword ? "text" : "password"} 
                        className="w-full pl-9 pr-10 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" 
                        placeholder="••••••••" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        required 
                        name="newPassword" 
                        onChange={handlePasswordChange} 
                        value={passwordForm.newPassword}
                        type={showNewPassword ? "text" : "password"} 
                        className="w-full pl-9 pr-10 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" 
                        placeholder="••••••••" 
                      />
                       <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                   {/* Confirm New Password */}
                   <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm New Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        required 
                        name="confirmPassword" 
                        onChange={handlePasswordChange} 
                        value={passwordForm.confirmPassword}
                        type={showConfirmPassword ? "text" : "password"} 
                        className="w-full pl-9 pr-10 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" 
                        placeholder="••••••••" 
                      />
                       <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">
                    <Lock className="h-4 w-4" />
                    Update Password
                  </button>
                </div>
              </div>
            </form>

            {/* --- Notification Preferences --- */}
            <form onSubmit={handleSaveNotifications} className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
                <h2 className="font-semibold flex items-center gap-2 text-lg pb-2 border-b border-border">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  
                  {/* Preference Item */}
                  <div className="flex justify-between items-center border-b border-border/50 pb-3">
                    <div>
                      <h3 className="font-medium">Receive Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Get updates on project assignments and task status changes via email.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifPreferences.email} 
                        onChange={() => handleNotifToggle('email')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Preference Item */}
                  <div className="flex justify-between items-center border-b border-border/50 pb-3">
                    <div>
                      <h3 className="font-medium">In-App Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive real-time alerts within the application interface.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifPreferences.inApp} 
                        onChange={() => handleNotifToggle('inApp')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Preference Item */}
                  <div className="flex justify-between items-center border-b border-border/50 pb-3">
                    <div>
                      <h3 className="font-medium">System Alert Broadcasts</h3>
                      <p className="text-sm text-muted-foreground">Receive important notifications about system maintenance or security.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifPreferences.systemAlerts} 
                        onChange={() => handleNotifToggle('systemAlerts')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Preference Item */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Marketing/Promotional Emails</h3>
                      <p className="text-sm text-muted-foreground">Receive occasional emails about new features and updates from the product team.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifPreferences.marketingEmails} 
                        onChange={() => handleNotifToggle('marketingEmails')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </form>
            
          </div>
        </main>
      </div>
    </div>
  )
}