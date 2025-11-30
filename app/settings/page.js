'use client'

import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast' 
import { Save, Building, Shield, Database, Bell, Pencil, X } from 'lucide-react'

// Import Sub-Components
import OrganizationSettings from './components/OrganizationSettings'
import PermissionsSettings from './components/PermissionsSettings'
import MasterDataSettings from './components/MasterDataSettings'
import NotificationSettings from './components/NotificationSettings'

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('organization')
  const [toast, setToast] = useState(null)
  
  // New State for Edit Mode
  const [isEditing, setIsEditing] = useState(false)

  // -- State Management for Tabs --
  const [orgSettings, setOrgSettings] = useState({
    name: 'Acme Corp',
    email: 'admin@acme.com',
    website: 'https://acme.com',
    workingHoursStart: '09:00',
    workingHoursEnd: '18:00',
    eodSubmissionTime: '17:30'
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    slackIntegration: false,
    dailyReport: true
  })

  // Handlers
  const handleOrgChange = (e) => {
    const { name, value } = e.target
    setOrgSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setToast({ message: 'Settings saved successfully', type: 'success' })
    setIsEditing(false) 
  }

  const handleCancel = () => {
    setIsEditing(false)
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
          
          <div className="p-6 w-full space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">Manage organization, roles, and system preferences</p>
              </div>
              
              {/* Conditional Buttons: ONLY show when activeTab is 'organization' */}
              {activeTab === 'organization' && (
                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-xl hover:bg-accent transition-colors"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-md font-medium text-sm"
                      >
                        <Save className="h-4 w-4" />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-card border border-border hover:bg-accent hover:text-accent-foreground text-foreground px-6 py-2 rounded-xl transition-all shadow-sm font-medium text-sm"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Details
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Horizontal Tabs */}
            <div className="border-b border-border">
              <div className="flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => {
                    setActiveTab('organization')
                    setIsEditing(false) // Reset edit mode when switching tabs
                  }}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'organization' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Building className="h-4 w-4" />
                  Organization
                </button>
                <button
                  onClick={() => {
                    setActiveTab('permissions')
                    setIsEditing(false)
                  }}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'permissions' 
                      ? 'border-purple-600 text-purple-600' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Roles & Permissions
                </button>
                <button
                  onClick={() => {
                    setActiveTab('masterData')
                    setIsEditing(false)
                  }}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'masterData' 
                      ? 'border-pink-600 text-pink-600' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Database className="h-4 w-4" />
                  Master Data
                </button>
                <button
                  onClick={() => {
                    setActiveTab('notifications')
                    setIsEditing(false)
                  }}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'notifications' 
                      ? 'border-yellow-600 text-yellow-600' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="mt-6">
              {activeTab === 'organization' && (
                <OrganizationSettings 
                  settings={orgSettings} 
                  onChange={handleOrgChange}
                  isEditing={isEditing} 
                />
              )}
              {activeTab === 'permissions' && <PermissionsSettings />}
              {activeTab === 'masterData' && <MasterDataSettings />}
              {activeTab === 'notifications' && (
                <NotificationSettings 
                  settings={notifications} 
                  setSettings={setNotifications} 
                />
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}