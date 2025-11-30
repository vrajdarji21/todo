'use client'

import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import ProjectStats from './components/ProjectStats'
import ProductivityChart from './components/ProductivityChart'
import EODSummary from './components/EODSummary'
import RecentActivities from './components/RecentActivities'
import { useState } from 'react'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        {/* Sidebar Wrapper */}
        <div className={`
          transition-all duration-300
          ${sidebarOpen ? 'w-64' : 'w-16'} 
        `}>
          {/* 1. Changed w-0 to w-16 above, so the sidebar is visible as icons 
            2. Passed state and toggle function down to Sidebar component
          */}
          <Sidebar 
            isOpen={sidebarOpen} 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          />
        </div>
        
        {/* Main Content */}
        <main 
          className="flex-1 min-h-screen transition-all duration-300"
          style={{ 
            marginTop: '56px',
            // 3. Updated calculation: if closed, subtract 64px (w-16) instead of 0
            width: sidebarOpen ? 'calc(100% - 256px)' : 'calc(100% - 64px)'
          }}
        >
          <div className="p-6">
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Project Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Overview of your projects, team performance, and recent activities
                  </p>
                </div>
                <div className="text-sm text-muted-foreground bg-accent/50 px-3 py-2 rounded-lg">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>

              <ProjectStats />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  <ProductivityChart />
                  <EODSummary />
                </div>
                <div className="space-y-6">
                  <RecentActivities />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}