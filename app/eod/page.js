'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast' 
import { Plus, Search, Filter, Pencil, Trash2, Eye, Calendar, User, Briefcase, Users } from 'lucide-react'

// Mock Data
const initialReports = [
  { id: 1, date: '2023-11-20', employee: 'John Doe', lead: 'Sarah Johnson', project: 'HRMS System', hours: 8, status: 'Submitted', completed: 3, pending: 1 },
  { id: 2, date: '2023-11-20', employee: 'Robert Fox', lead: 'Mike Chen', project: 'Portfolio Website', hours: 7.5, status: 'Reviewed', completed: 5, pending: 0 },
  { id: 3, date: '2023-11-19', employee: 'Alice Smith', lead: 'Sarah Johnson', project: 'HRMS System', hours: 8, status: 'Submitted', completed: 2, pending: 2 },
]

export default function EODPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('') // Search by Employee Name
  const [projectFilter, setProjectFilter] = useState('All')
  const [leadFilter, setLeadFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')

  const [reports, setReports] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [toast, setToast] = useState(null)

  // Load Data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const storedReports = localStorage.getItem('eod_reports')
        if (storedReports) {
          try {
            setReports(JSON.parse(storedReports))
          } catch (error) {
            setReports(initialReports)
          }
        } else {
          setReports(initialReports)
          localStorage.setItem('eod_reports', JSON.stringify(initialReports))
        }
        setIsLoaded(true)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Derived Data for Dropdowns
  const uniqueProjects = [...new Set(reports.map(r => r.project).filter(Boolean))]
  const uniqueLeads = [...new Set(reports.map(r => r.lead).filter(Boolean))]

  // Filter Logic
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.employee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = projectFilter === 'All' || report.project === projectFilter
    const matchesLead = leadFilter === 'All' || report.lead === leadFilter
    const matchesDate = !dateFilter || report.date === dateFilter

    return matchesSearch && matchesProject && matchesLead && matchesDate
  })

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this report?')) {
      const updatedReports = reports.filter(r => r.id !== id)
      setReports(updatedReports)
      localStorage.setItem('eod_reports', JSON.stringify(updatedReports))
      setToast({ message: 'Report deleted successfully', type: 'success' })
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
                  EOD Reports
                </h1>
                <p className="text-muted-foreground mt-1">Track daily progress and team productivity</p>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Employee Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search employee..." 
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
                    {uniqueProjects.map((p, i) => <option key={i} value={p}>{p}</option>)}
                  </select>
                </div>

                {/* Team Lead Filter */}
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={leadFilter}
                    onChange={(e) => setLeadFilter(e.target.value)}
                  >
                    <option value="All">All Team Leads</option>
                    {uniqueLeads.map((l, i) => <option key={i} value={l}>{l}</option>)}
                  </select>
                </div>

                {/* Date Filter */}
                <div className="relative">
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
                      <th className="px-6 py-4 font-semibold text-foreground">Date</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Employee</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Project</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Hours</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Tasks (Done/Pending)</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!isLoaded ? (
                       <tr><td colSpan="7" className="px-6 py-4 text-center">Loading reports...</td></tr>
                    ) : filteredReports.length === 0 ? (
                       <tr><td colSpan="7" className="px-6 py-4 text-center text-muted-foreground">No reports found.</td></tr>
                    ) : (
                      filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                            {report.date}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
                                {report.employee.charAt(0)}
                              </div>
                              <span className="text-muted-foreground">{report.employee}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">{report.project}</td>
                          <td className="px-6 py-4 text-muted-foreground">{report.hours} hrs</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="px-2 py-1 bg-green-500/10 text-green-600 rounded-md">
                                {report.completed} Done
                              </span>
                              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded-md">
                                {report.pending} Pending
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.status === 'Reviewed' ? 'bg-green-500/10 text-green-600' :
                              'bg-yellow-500/10 text-yellow-600'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end items-center gap-2">
                               {/* View Button */}
                               <Link href={`/eod/${report.id}`}>
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