'use client'

import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Briefcase, 
  Target,
  Search,
  Filter,
  Eye,
  Calendar
} from 'lucide-react'

// Mock Data for Employees
const employeeStats = [
  { id: 1, name: 'John Doe', role: 'Developer', score: 92, assigned: 45, completed: 42, avgResponse: '2h 15m', eodRate: '98%' },
  { id: 2, name: 'Alice Smith', role: 'Designer', score: 88, assigned: 30, completed: 28, avgResponse: '1h 45m', eodRate: '95%' },
  { id: 3, name: 'Robert Fox', role: 'Developer', score: 76, assigned: 50, completed: 35, avgResponse: '4h 10m', eodRate: '85%' },
]

// Mock Data for Projects
const projectStats = [
  { id: 1, name: 'HRMS System', progress: 75, velocity: 'High', delayed: 2, onTimeRate: '90%', teamSize: 5, status: 'Active' },
  { id: 2, name: 'Portfolio Website', progress: 100, velocity: 'Medium', delayed: 0, onTimeRate: '100%', teamSize: 2, status: 'Completed' },
  { id: 3, name: 'Mobile App', progress: 45, velocity: 'Low', delayed: 5, onTimeRate: '70%', teamSize: 6, status: 'Active' },
]

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('employee') // 'employee' or 'project'
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  return (
    <div className="min-h-screen bg-background">
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
                  Analytics & Reports
                </h1>
                <p className="text-muted-foreground mt-1">Track team performance and project metrics</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('employee')}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'employee' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Employee Performance
                </button>
                <button
                  onClick={() => setActiveTab('project')}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'project' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Project Performance
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder={activeTab === 'employee' ? "Search employees..." : "Search projects..."}
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Role/Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={activeTab === 'employee' ? roleFilter : statusFilter}
                    onChange={(e) => activeTab === 'employee' ? setRoleFilter(e.target.value) : setStatusFilter(e.target.value)}
                  >
                    {activeTab === 'employee' ? (
                      <>
                        <option value="All">All Roles</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                      </>
                    ) : (
                      <>
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                      </>
                    )}
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
                  />
                </div>

                {/* Metric Filter */}
                <div className="relative">
                  <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="All">All Metrics</option>
                    <option value="productivity">Productivity</option>
                    <option value="completion">Completion Rate</option>
                    <option value="timeliness">Timeliness</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              
              {/* Employee Performance View */}
              {activeTab === 'employee' && (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                      <div className="p-2 bg-green-500/10 text-green-600 rounded-lg">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Avg Productivity</p>
                        <p className="font-bold text-xl">88%</p>
                      </div>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                      <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Task Completion</p>
                        <p className="font-bold text-xl">92%</p>
                      </div>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Avg Response</p>
                        <p className="font-bold text-xl">2h 10m</p>
                      </div>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                      <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">EOD Submissions</p>
                        <p className="font-bold text-xl">96%</p>
                      </div>
                    </div>
                  </div>

                  {/* Employee Table */}
                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 border-b border-border">
                          <tr>
                            <th className="px-6 py-4 font-semibold text-foreground">Employee</th>
                            <th className="px-6 py-4 font-semibold text-foreground">Productivity Score</th>
                            <th className="px-6 py-4 font-semibold text-foreground">Tasks (Done/Total)</th>
                            <th className="px-6 py-4 font-semibold text-foreground">Avg Response</th>
                            <th className="px-6 py-4 font-semibold text-foreground">EOD Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {employeeStats.map((emp) => (
                            <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                    {emp.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">{emp.name}</p>
                                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-full max-w-[100px] bg-muted rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        emp.score >= 90 ? 'bg-green-500' : emp.score >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                                      }`} 
                                      style={{ width: `${emp.score}%` }}
                                    />
                                  </div>
                                  <span className="text-xs font-medium">{emp.score}%</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {emp.completed} / {emp.assigned}
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {emp.avgResponse}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  parseFloat(emp.eodRate) >= 95 ? 'bg-green-500/10 text-green-600' :
                                  parseFloat(emp.eodRate) >= 85 ? 'bg-blue-500/10 text-blue-600' :
                                  'bg-yellow-500/10 text-yellow-600'
                                }`}>
                                  {emp.eodRate}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Performance View */}
              {activeTab === 'project' && (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                      <div className="p-2 bg-green-500/10 text-green-600 rounded-lg">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Avg Progress</p>
                        <p className="font-bold text-xl">73%</p>
                      </div>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                      <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">On-Time Rate</p>
                        <p className="font-bold text-xl">87%</p>
                      </div>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Completed</p>
                        <p className="font-bold text-xl">2 Projects</p>
                      </div>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                      <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Delayed Tasks</p>
                        <p className="font-bold text-xl">7 Tasks</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectStats.map((proj) => (
                      <div key={proj.id} className="bg-card border border-border rounded-xl p-6 shadow-xs hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{proj.name}</h3>
                            <p className="text-xs text-muted-foreground">{proj.teamSize} Team Members</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            proj.status === 'Active' ? 'bg-green-500/10 text-green-600' :
                            proj.status === 'Completed' ? 'bg-blue-500/10 text-blue-600' :
                            'bg-yellow-500/10 text-yellow-600'
                          }`}>
                            {proj.status}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {/* Progress Bar */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Completion</span>
                              <span>{proj.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${proj.progress}%` }}></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="bg-muted/30 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="h-4 w-4 text-purple-600" />
                                <span className="text-xs font-medium">Velocity</span>
                              </div>
                              <p className={`text-sm font-bold ${
                                proj.velocity === 'High' ? 'text-green-600' :
                                proj.velocity === 'Medium' ? 'text-blue-600' : 'text-yellow-600'
                              }`}>
                                {proj.velocity}
                              </p>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-green-600" />
                                <span className="text-xs font-medium">On-Time</span>
                              </div>
                              <p className="text-sm font-bold">{proj.onTimeRate}</p>
                            </div>
                          </div>

                          {proj.delayed > 0 && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-xs">
                              <AlertCircle className="h-4 w-4" />
                              <span>{proj.delayed} tasks delayed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}