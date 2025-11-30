'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast' 
import { ArrowLeft, Save, User, Mail, Phone, Lock, Briefcase, Shield, Eye, EyeOff } from 'lucide-react'

export default function EditUserPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [toast, setToast] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const params = useParams()
  const userId = params.id
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'Employee', password: '', 
    department: '', status: 'Active'
  })

  // Load Existing Data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && userId) {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
        const user = storedUsers.find(u => u.id.toString() === userId.toString())
        
        if (user) {
          // Merge with defaults to ensure no undefined values
          setFormData(prev => ({ ...prev, ...user }))
        } else {
          setToast({ message: 'User not found', type: 'error' })
        }
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [userId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
       setToast({ message: 'Please fill in required fields', type: 'error' })
       return
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = storedUsers.map(u => 
      u.id.toString() === userId.toString() ? formData : u
    )
    
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    setToast({ message: 'User Updated Successfully!', type: 'success' })
    setTimeout(() => {
        router.push('/team')
    }, 1000)
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
            <div className="flex items-center gap-4 mb-6">
              <Link href="/team" className="p-2 hover:bg-accent rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Edit User</h1>
                <p className="text-sm text-muted-foreground">Update user details and access rights</p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              
              <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
                <h2 className="font-semibold flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-blue-600" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      {/* FIX: Added || '' to value */}
                      <input required name="name" value={formData.name || ''} onChange={handleChange} type="text" className="w-full pl-9 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input required name="email" value={formData.email || ''} onChange={handleChange} type="email" className="w-full pl-9 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input name="phone" value={formData.phone || ''} onChange={handleChange} type="tel" className="w-full pl-9 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
                 <h2 className="font-semibold flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Role & Access
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <select name="role" value={formData.role || 'Employee'} onChange={handleChange} className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="Employee">Employee</option>
                      <option value="Team Lead">Team Lead</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department (Optional)</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input name="department" value={formData.department || ''} onChange={handleChange} type="text" className="w-full pl-9 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password (Leave blank to keep current)</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        name="password" 
                        value={formData.password || ''} 
                        onChange={handleChange} 
                        type={showPassword ? "text" : "password"} 
                        className="w-full pl-9 pr-10 p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" 
                        placeholder="••••••••" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select name="status" value={formData.status || 'Active'} onChange={handleChange} className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Link href="/team">
                  <button type="button" className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    Cancel
                  </button>
                </Link>
                <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <Save className="h-4 w-4" />
                  Update User
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  )
}