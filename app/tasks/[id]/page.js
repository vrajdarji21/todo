'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import Toast from '@/components/ui/Toast'
import { ArrowLeft, Clock, Calendar, AlertCircle, CheckCircle2, MessageSquare, Send } from 'lucide-react'

export default function TaskDetailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [task, setTask] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [toast, setToast] = useState(null)
  const params = useParams()
  const taskId = params.id

  // Load Task
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        const found = storedTasks.find(t => t.id.toString() === taskId.toString())
        setTask(found)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [taskId])

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment = {
      id: Date.now(),
      user: 'Super Admin', // Hardcoded for this view
      text: commentText,
      time: new Date().toLocaleString()
    }

    // Update Local State
    const updatedTask = {
      ...task,
      comments: [...(task.comments || []), newComment]
    }
    setTask(updatedTask)
    setCommentText('')

    // Update Storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const updatedTasksList = storedTasks.map(t => t.id.toString() === taskId.toString() ? updatedTask : t)
    localStorage.setItem('tasks', JSON.stringify(updatedTasksList))
    
    setToast({ message: 'Comment added', type: 'success' })
  }

  if (!task) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>

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
            <div className="flex items-center gap-4">
              <Link href="/tasks" className="p-2 hover:bg-accent rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">{task.title}</h1>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${
                    task.priority === 'High' ? 'text-red-600 bg-red-100 border-red-200 dark:bg-red-900/30' :
                    task.priority === 'Medium' ? 'text-orange-600 bg-orange-100 border-orange-200 dark:bg-orange-900/30' :
                    'text-blue-600 bg-blue-100 border-blue-200 dark:bg-blue-900/30'
                  }`}>
                    {task.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Project: {task.project}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column (Activity) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Status Bar */}
                <div className="bg-card border border-border rounded-xl p-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Due:</span>
                    <span className="text-sm text-muted-foreground">{task.deadline}</span>
                  </div>
                </div>

                {/* Comments / Activity Feed */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Activity & Comments</h3>
                  </div>

                  {/* List */}
                  <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto">
                    {!task.comments || task.comments.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-4">No comments yet.</p>
                    ) : (
                      task.comments.map((comment, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600 flex-shrink-0">
                            {comment.user.charAt(0)}
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-semibold">{comment.user}</span>
                              <span className="text-xs text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-sm text-foreground">{comment.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Input */}
                  <form onSubmit={handleAddComment} className="relative">
                    <input
                      type="text"
                      className="w-full pl-4 pr-12 py-3 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!commentText.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column (Meta) */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Assigned To</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {task.assignedTo ? task.assignedTo.charAt(0) : '?'}
                    </div>
                    <div>
                      <p className="font-medium">{task.assignedTo}</p>
                      <p className="text-xs text-muted-foreground">Employee</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                   <h3 className="font-semibold mb-4">Task Details</h3>
                   <div className="space-y-3">
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground">Created By</span>
                       <span className="font-medium">Team Lead</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground">Date Created</span>
                       <span className="font-medium">Nov 01, 2023</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground">ID</span>
                       <span className="font-medium font-mono">#{task.id}</span>
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