'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast' 
import { Plus, Search, Filter, Pencil, Trash2, Eye, Calendar, User } from 'lucide-react'

// Mock Data for initial load
const initialMockData = [
  { id: 1, name: 'HRMS System', lead: 'Sarah Johnson', team: ['John Doe', 'Alice Smith'], start: '2023-09-01', deadline: '2023-12-01', status: 'Active' },
  { id: 2, name: 'Portfolio Website', lead: 'Mike Chen', team: ['Robert Fox'], start: '2023-10-15', deadline: '2023-11-20', status: 'Completed' },
]

export default function ProjectsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [leadFilter, setLeadFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')

  const [projects, setProjects] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const storedProjects = localStorage.getItem('projects')
        if (storedProjects) {
          try {
            setProjects(JSON.parse(storedProjects))
          } catch (error) {
            setProjects(initialMockData)
          }
        } else {
          setProjects(initialMockData)
          localStorage.setItem('projects', JSON.stringify(initialMockData))
        }
        setIsLoaded(true)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Dynamic list of Team Leads for the dropdown
  const uniqueLeads = [...new Set(projects.map(p => p.lead).filter(Boolean))]

  const filteredProjects = projects.filter(project => {
    // 1. Search Logic (Name or Lead Name)
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (project.lead && project.lead.toLowerCase().includes(searchTerm.toLowerCase()))
    
    // 2. Status Filter
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter

    // 3. Team Lead Filter
    const matchesLead = leadFilter === 'All' || project.lead === leadFilter

    // 4. Date Filter (Matches Start Date)
    const matchesDate = !dateFilter || project.start === dateFilter

    return matchesSearch && matchesStatus && matchesLead && matchesDate
  })

  const handleDelete = (id) => {
    // 1. Filter out the project
    const updatedProjects = projects.filter(p => p.id !== id)
    
    // 2. Update State
    setProjects(updatedProjects)
    
    // 3. Update Local Storage
    localStorage.setItem('projects', JSON.stringify(updatedProjects))
    
    // 4. Show Success Toast
    setToast({ message: 'Project deleted successfully', type: 'success' })
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Projects
                </h1>
                <p className="text-muted-foreground mt-1">Manage and track all ongoing projects</p>
              </div>
              <Link href="/projects/new">
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                  <Plus className="h-4 w-4" />
                  Create New Project
                </button>
              </Link>
            </div>

            {/* Filters Bar */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Team Lead Filter */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={leadFilter}
                    onChange={(e) => setLeadFilter(e.target.value)}
                  >
                    <option value="All">All Team Leads</option>
                    {uniqueLeads.map((lead, index) => (
                      <option key={index} value={lead}>{lead}</option>
                    ))}
                  </select>
                </div>

                {/* Date Filter */}
                <div className="relative">
                  {/* Icon logic: Using CSS pointer-events-none to let click pass through to input */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input 
                    type="date" 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-muted-foreground"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>

              </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-foreground">Project Name</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Team Lead</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Team</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Deadline</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!isLoaded ? (
                       <tr><td colSpan="6" className="px-6 py-4 text-center">Loading...</td></tr>
                    ) : filteredProjects.length === 0 ? (
                       <tr><td colSpan="6" className="px-6 py-4 text-center text-muted-foreground">No projects found.</td></tr>
                    ) : (
                      filteredProjects.map((project) => {
                        const teamCount = Array.isArray(project.team) ? project.team.length : 0;
                        
                        return (
                          <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4">
                              <Link href={`/projects/${project.id}`} className="font-medium hover:text-blue-600 transition-colors">
                                {project.name}
                              </Link>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
                                  {project.lead ? project.lead.charAt(0) : '?'}
                                </div>
                                <span className="text-muted-foreground">{project.lead || 'Unassigned'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              <div className="flex -space-x-2">
                                {[...Array(Math.min(3, teamCount))].map((_, i) => (
                                  <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-gray-200" />
                                ))}
                                {teamCount > 3 && (
                                  <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px]">
                                    +{teamCount - 3}
                                  </div>
                                )}
                                {teamCount === 0 && <span className="text-xs">No members</span>}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">{project.deadline}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.status === 'Active' ? 'bg-green-500/10 text-green-600' :
                                project.status === 'Completed' ? 'bg-blue-500/10 text-blue-600' :
                                'bg-yellow-500/10 text-yellow-600'
                              }`}>
                                {project.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end items-center gap-2">
                                 {/* View Button */}
                                 <Link href={`/projects/${project.id}`}>
                                   <button className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-100 rounded-md transition-colors" title="View">
                                     <Eye className="h-4 w-4" />
                                   </button>
                                 </Link>

                                 {/* Edit Button */}
                                 <Link href={`/projects/${project.id}/edit`}>
                                   <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                                     <Pencil className="h-4 w-4" />
                                   </button>
                                 </Link>

                                 {/* Delete Button */}
                                 <button 
                                  onClick={() => handleDelete(project.id)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                                  title="Delete"
                                 >
                                   <Trash2 className="h-4 w-4" />
                                 </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}