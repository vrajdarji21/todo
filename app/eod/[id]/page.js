'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import { ArrowLeft, Clock, CheckCircle2, AlertTriangle, MessageSquare, User, Calendar, Briefcase } from 'lucide-react'

// Mock Detail Data (In a real app, you would fetch this by ID)
const mockEODDetails = {
  id: 1, 
  date: '2023-11-20', 
  employee: 'John Doe', 
  lead: 'Sarah Johnson', 
  project: 'HRMS System', 
  hours: 8, 
  status: 'Submitted',
  completedTasks: [
    'Designed the login page UI in Figma',
    'Implemented the authentication API integration',
    'Fixed responsive issues on the dashboard sidebar'
  ],
  pendingTasks: [
    'Write unit tests for auth module',
    'Connect the "Forgot Password" flow'
  ],
  issues: 'Had some trouble with the CORS policy on the backend dev server, took about an hour to resolve.',
  tlComments: 'Good progress, John. Let\'s sync up tomorrow regarding the CORS issue to ensure it doesn\'t happen on staging.'
}

export default function EODDetailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [report, setReport] = useState(null)
  const params = useParams()
  const reportId = params.id

  useEffect(() => {
    // Simulating API fetch
    const timer = setTimeout(() => {
        // In reality, search localStorage or fetch API
        // For demo, just returning the mock object
        setReport(mockEODDetails)
    }, 0)
    return () => clearTimeout(timer)
  }, [reportId])

  if (!report) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>

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
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Link href="/eod" className="p-2 hover:bg-accent rounded-full transition-colors">
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">EOD Report</h1>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {report.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {report.employee}</span>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-lg border border-blue-200 dark:border-blue-900 text-sm font-medium">
                {report.status}
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hours Worked</p>
                  <p className="font-semibold">{report.hours} Hours</p>
                </div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Project</p>
                  <p className="font-semibold">{report.project}</p>
                </div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Team Lead</p>
                  <p className="font-semibold">{report.lead}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: Tasks */}
              <div className="space-y-6">
                
                {/* Completed */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">Tasks Completed</h3>
                  </div>
                  <ul className="space-y-3">
                    {report.completedTasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pending */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-semibold">Pending Tasks</h3>
                  </div>
                  <ul className="space-y-3">
                    {report.pendingTasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right Column: Issues & Comments */}
              <div className="space-y-6">
                
                {/* Issues */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold">Issues / Challenges</h3>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                    <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
                      {report.issues || "No issues reported."}
                    </p>
                  </div>
                </div>

                {/* TL Comments */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">Team Lead Comments</h3>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                            {report.lead.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-foreground">{report.lead}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      &quot;{report.tlComments || "No comments yet."}&quot;
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}