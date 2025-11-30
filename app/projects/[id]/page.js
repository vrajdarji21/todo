'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import { ArrowLeft, Clock, Calendar, AlertCircle, FileText, CheckCircle2 } from 'lucide-react'

export default function ProjectDetailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [project, setProject] = useState(null)
  const params = useParams()
  const projectId = params.id

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]')
        const found = storedProjects.find(p => p.id.toString() === projectId.toString())
        setProject(found)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [projectId])

  if (!project) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>

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
                <Link href="/projects" className="p-2 hover:bg-accent rounded-full transition-colors">
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </Link>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-200 dark:border-green-900">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Client: {project.client || 'Internal'}</p>
                </div>
              </div>
              <Link href={`/projects/${project.id}/edit`}>
                <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent">
                  Edit Project
                </button>
              </Link>
            </div>

            {/* Overview Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="font-semibold">{project.deadline || 'N/A'}</p>
                </div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="font-semibold">{project.start || 'N/A'}</p>
                </div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Priority</p>
                  <p className="font-semibold text-orange-600">{project.priority}</p>
                </div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-green-500/10 text-green-600 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Completion</p>
                  <p className="font-semibold">68%</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-3">Project Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description || 'No description provided.'}
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Active Tasks</h3>
                    <button className="text-xs text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((task) => (
                      <div key={task} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${task === 1 ? 'bg-orange-500' : 'bg-blue-500'}`} />
                          <div>
                            <p className="text-sm font-medium">Design Dashboard UI</p>
                            <p className="text-xs text-muted-foreground">Assigned to Mike Chen</p>
                          </div>
                        </div>
                        <span className="text-xs bg-muted px-2 py-1 rounded">In Progress</span>
                      </div>
                    ))}
                  </div>
                </div>

                 <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Recent EOD Logs</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Mike Chen <span className="text-muted-foreground font-normal">updated yesterday</span></p>
                        <p className="text-sm text-muted-foreground mt-1">Completed the navbar responsiveness and fixed sidebar toggle issues.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Team Members</h3>
                  <div className="space-y-4">
                    {project.lead && (
                        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                                {project.lead.charAt(0)}
                            </div>
                            <div>
                            <p className="text-sm font-medium">{project.lead}</p>
                            <p className="text-xs text-muted-foreground">Team Lead</p>
                            </div>
                        </div>
                        </div>
                    )}
                    {Array.isArray(project.team) && project.team.map((member, i) => (
                        <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs">
                                {member.charAt(0)}
                            </div>
                            <div>
                            <p className="text-sm font-medium">{member}</p>
                            <p className="text-xs text-muted-foreground">Developer</p>
                            </div>
                        </div>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                   <h3 className="font-semibold mb-4">Attachments</h3>
                   <div className="space-y-2">
                     <div className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer">
                        <FileText className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Requirements.pdf</span>
                     </div>
                     <div className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Wireframes.fig</span>
                     </div>
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