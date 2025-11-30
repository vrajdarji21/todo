'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast' 
import { Plus, Search, Filter, Pencil, Trash2, Eye, Briefcase, User, AlertCircle, CheckCircle2 } from 'lucide-react'

// Mock Data
const initialTasks = [
  { id: 1, title: 'Design Homepage Mockup', project: 'Portfolio Website', assignedTo: 'Mike Chen', priority: 'High', status: 'In Progress', deadline: '2023-11-25' },
  { id: 2, title: 'Database Schema Design', project: 'HRMS System', assignedTo: 'John Doe', priority: 'High', status: 'Pending', deadline: '2023-12-01' },
  { id: 3, title: 'Fix Login Bug', project: 'HRMS System', assignedTo: 'Alice Smith', priority: 'Medium', status: 'Completed', deadline: '2023-11-20' },
  { id: 4, title: 'Create Marketing Assets', project: 'Match-3 Game', assignedTo: 'Sarah Johnson', priority: 'Low', status: 'In Progress', deadline: '2024-01-15' },
]

export default function TasksPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [projectFilter, setProjectFilter] = useState('All')
  const [employeeFilter, setEmployeeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const [tasks, setTasks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [toast, setToast] = useState(null)

  // Load Data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const storedTasks = localStorage.getItem('tasks')
        if (storedTasks) {
          try {
            setTasks(JSON.parse(storedTasks))
          } catch (error) {
            setTasks(initialTasks)
          }
        } else {
          setTasks(initialTasks)
          localStorage.setItem('tasks', JSON.stringify(initialTasks))
        }
        setIsLoaded(true)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Derived Data for Filters
  const uniqueProjects = [...new Set(tasks.map(t => t.project).filter(Boolean))]
  const uniqueEmployees = [...new Set(tasks.map(t => t.assignedTo).filter(Boolean))]

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = projectFilter === 'All' || task.project === projectFilter
    const matchesEmployee = employeeFilter === 'All' || task.assignedTo === employeeFilter
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter

    return matchesSearch && matchesProject && matchesEmployee && matchesStatus && matchesPriority
  })

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter(t => t.id !== id)
      setTasks(updatedTasks)
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      setToast({ message: 'Task deleted successfully', type: 'success' })
    }
  }

  // Helper for Priority Colors
  const getPriorityColor = (p) => {
    switch(p) {
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-900'
      case 'Medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-900'
      case 'Low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900'
      default: return 'text-gray-600 bg-gray-100'
    }
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
                  Tasks
                </h1>
                <p className="text-muted-foreground mt-1">Manage and track all tasks across projects</p>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Project Filter */}
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={projectFilter}
                    onChange={(e) => setProjectFilter(e.target.value)}
                  >
                    <option value="All">All Projects</option>
                    {uniqueProjects.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                {/* Employee Filter */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={employeeFilter}
                    onChange={(e) => setEmployeeFilter(e.target.value)}
                  >
                    <option value="All">All Employees</option>
                    {uniqueEmployees.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-foreground">Task Title</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Project</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Assigned To</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Priority</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!isLoaded ? (
                       <tr><td colSpan="6" className="px-6 py-4 text-center">Loading tasks...</td></tr>
                    ) : filteredTasks.length === 0 ? (
                       <tr><td colSpan="6" className="px-6 py-4 text-center text-muted-foreground">No tasks found.</td></tr>
                    ) : (
                      filteredTasks.map((task) => (
                        <tr key={task.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <Link href={`/tasks/${task.id}`} className="font-medium hover:text-blue-600 transition-colors">
                              {task.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">{task.project}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
                                {task.assignedTo ? task.assignedTo.charAt(0) : '?'}
                              </div>
                              <span className="text-muted-foreground">{task.assignedTo}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.status === 'Completed' ? 'bg-green-500/10 text-green-600' :
                              task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-600' :
                              'bg-yellow-500/10 text-yellow-600'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end items-center gap-2">
                               {/* View Button */}
                               <Link href={`/tasks/${task.id}`}>
                                 <button className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-100 rounded-md transition-colors" title="View">
                                   <Eye className="h-4 w-4" />
                                 </button>
                               </Link>
                            </div>
                          </td>
                        </tr>
                      ))
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