'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast' 
import { ArrowLeft, Save, Calendar, User, Briefcase } from 'lucide-react'

export default function EditProjectPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [toast, setToast] = useState(null)
  const router = useRouter()
  const params = useParams()
  const projectId = params.id

  const [formData, setFormData] = useState({
    name: '', client: '', description: '', start: '', deadline: '', 
    priority: 'Medium', status: 'Active', lead: '', team: []
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && projectId) {
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]')
        const project = storedProjects.find(p => p.id.toString() === projectId.toString())
        
        if (project) {
          // Merge defaults to prevent undefined values
          setFormData(prev => ({ ...prev, ...project }))
        } else {
          setToast({ message: 'Project not found', type: 'error' })
        }
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [projectId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTeamChange = (e) => {
    const { value, checked } = e.target
    setFormData(prev => {
      const currentTeam = Array.isArray(prev.team) ? prev.team : []
      if (checked) return { ...prev, team: [...currentTeam, value] }
      return { ...prev, team: currentTeam.filter(t => t !== value) }
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    const updatedProjects = storedProjects.map(p => 
      p.id.toString() === projectId.toString() ? formData : p
    )
    
    localStorage.setItem('projects', JSON.stringify(updatedProjects))
    setToast({ message: 'Project Updated Successfully!', type: 'success' })
    setTimeout(() => {
        router.push('/projects')
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
              <Link href="/projects" className="p-2 hover:bg-accent rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
                <p className="text-sm text-muted-foreground">Update project details and team allocation</p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  Project Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name</label>
                    <input required name="name" value={formData.name || ''} onChange={handleChange} type="text" className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Client Name</label>
                    <input name="client" value={formData.client || ''} onChange={handleChange} type="text" className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500 h-24" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
                 <h2 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  Timeline & Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <input name="start" value={formData.start || ''} onChange={handleChange} type="date" className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Deadline</label>
                    <input name="deadline" value={formData.deadline || ''} onChange={handleChange} type="date" className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <select name="priority" value={formData.priority || 'Medium'} onChange={handleChange} className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select name="status" value={formData.status || 'Active'} onChange={handleChange} className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
                 <h2 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-orange-600" />
                  Team Allocation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assign Team Lead</label>
                    <select name="lead" value={formData.lead || ''} onChange={handleChange} className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Leader...</option>
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Mike Chen">Mike Chen</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assign Employees</label>
                    <div className="p-2 bg-background border border-border rounded-lg h-24 overflow-y-auto space-y-1">
                      {['John Doe', 'Alice Smith', 'Robert Fox', 'Emily Davis'].map((name, i) => (
                        <label key={i} className="flex items-center gap-2 text-sm p-1 hover:bg-muted rounded cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600" 
                            value={name}
                            checked={Array.isArray(formData.team) && formData.team.includes(name)}
                            onChange={handleTeamChange}
                          />
                          {name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Link href="/projects">
                  <button type="button" className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    Cancel
                  </button>
                </Link>
                <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  <Save className="h-4 w-4" />
                  Update Project
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  )
}