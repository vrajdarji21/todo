'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast' 
import { 
  Search, 
  Filter, 
  Download, 
  History, 
  LogIn, 
  FolderPlus, 
  CheckSquare, 
  FileText, 
  UploadCloud,
  Trash2,
  Shield,
  Clock,
  Calendar
} from 'lucide-react'

// Mock Data
const initialLogs = [
  { id: 1, user: 'Sarah Johnson', action: 'User Login', details: 'Logged in successfully', type: 'Auth', ip: '192.168.1.12', time: '10:42 AM', date: '2023-11-21' },
  { id: 2, user: 'Mike Chen', action: 'Task Update', details: 'Changed status of "Homepage UI" to Done', type: 'Task', ip: '192.168.1.15', time: '10:30 AM', date: '2023-11-21' },
  { id: 3, user: 'Sarah Johnson', action: 'Project Created', details: 'Created new project "Mobile App Redesign"', type: 'Project', ip: '192.168.1.12', time: '09:15 AM', date: '2023-11-21' },
  { id: 4, user: 'John Doe', action: 'EOD Submission', details: 'Submitted daily report for HRMS System', type: 'EOD', ip: '192.168.1.45', time: '06:00 PM', date: '2023-11-20' },
  { id: 5, user: 'Robert Fox', action: 'File Upload', details: 'Uploaded "requirements_v2.pdf"', type: 'File', ip: '192.168.1.33', time: '04:20 PM', date: '2023-11-20' },
  { id: 6, user: 'Admin User', action: 'Settings Update', details: 'Updated Organization working hours', type: 'System', ip: '192.168.1.1', time: '02:00 PM', date: '2023-11-20' },
]

export default function ActivityLogsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  const [logs, setLogs] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [toast, setToast] = useState(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')

  // Load Data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const storedLogs = localStorage.getItem('activity_logs')
        if (storedLogs) {
          try {
            setLogs(JSON.parse(storedLogs))
          } catch (error) {
            setLogs(initialLogs)
          }
        } else {
          setLogs(initialLogs)
          localStorage.setItem('activity_logs', JSON.stringify(initialLogs))
        }
        setIsLoaded(true)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Filter Logic
  const filteredLogs = logs.filter(log => {
    // 1. Search
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.details.toLowerCase().includes(searchTerm.toLowerCase())
    
    // 2. Dropdown Type
    const matchesType = typeFilter === 'All' || log.type === typeFilter
    
    // 3. Date
    const matchesDate = !dateFilter || log.date === dateFilter

    return matchesSearch && matchesType && matchesDate
  })

  const handleExport = () => {
    setToast({ message: 'Audit logs exported successfully (CSV)', type: 'success' })
  }

  // Helper to get Icon based on log type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Auth': return <LogIn className="h-3 w-3" />
      case 'Project': return <FolderPlus className="h-3 w-3" />
      case 'Task': return <CheckSquare className="h-3 w-3" />
      case 'EOD': return <FileText className="h-3 w-3" />
      case 'File': return <UploadCloud className="h-3 w-3" />
      default: return <History className="h-3 w-3" />
    }
  }

  const getTypeStyles = (type) => {
    switch (type) {
      case 'Auth': return 'bg-green-500/10 text-green-600'
      case 'Project': return 'bg-blue-500/10 text-blue-600'
      case 'Task': return 'bg-orange-500/10 text-orange-600'
      case 'EOD': return 'bg-purple-500/10 text-purple-600'
      case 'File': return 'bg-pink-500/10 text-pink-600'
      default: return 'bg-gray-500/10 text-gray-600'
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
                  Audit Logs
                </h1>
                <p className="text-muted-foreground mt-1">Track system activities, user actions, and security events</p>
              </div>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Download className="h-4 w-4" />
                Export Logs
              </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search by user or details..." 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Type Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="Auth">Login / Auth</option>
                    <option value="Project">Projects</option>
                    <option value="Task">Tasks</option>
                    <option value="EOD">EOD Reports</option>
                    <option value="File">File Uploads</option>
                  </select>
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                      <th className="px-6 py-4 font-semibold text-foreground">User Entity</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Action Type</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Activity Details</th>
                      <th className="px-6 py-4 font-semibold text-foreground">IP Source</th>
                      <th className="px-6 py-4 text-right font-semibold text-foreground">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!isLoaded ? (
                       <tr><td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">Loading logs...</td></tr>
                    ) : filteredLogs.length === 0 ? (
                       <tr><td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">No logs found.</td></tr>
                    ) : (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-muted/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                {log.user.charAt(0)}
                              </div>
                              <span className="font-medium text-foreground">{log.user}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getTypeStyles(log.type)}`}>
                              {getTypeIcon(log.type)}
                              {log.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {log.details}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Shield className="h-3 w-3" />
                                <span className="font-mono text-xs">{log.ip}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-muted-foreground">
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span className="font-medium text-foreground">{log.time}</span>
                              </div>
                              <span className="text-xs">{log.date}</span>
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