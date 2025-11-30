'use client'

import { CheckCircle, Clock, AlertTriangle, Target } from 'lucide-react'
import { useState } from 'react'

export default function EODSummary() {
  const [summary] = useState({
    completed: 45,
    inProgress: 12,
    overdue: 3,
    productivity: 88
  })

  const stats = [
    {
      label: 'Completed',
      value: summary.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      label: 'In Progress',
      value: summary.inProgress,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      label: 'Overdue',
      value: summary.overdue,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      label: 'Productivity',
      value: `${summary.productivity}%`,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-200 dark:border-purple-800'
    }
  ]

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-xs">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-lg">End of Day Summary</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="text-center p-4 rounded-lg border border-border hover:shadow-sm transition-all duration-200"
          >
            <stat.icon className={`h-7 w-7 mx-auto mb-2 ${stat.color}`} />
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Daily Target Achievement</span>
            <span className="text-sm font-bold text-green-600">92%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: '92%' }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-muted-foreground">Team Performance</span>
          <span className="text-sm font-medium text-blue-600 bg-blue-500/10 px-2 py-1 rounded-md">
            Excellent
          </span>
        </div>
      </div>
    </div>
  )
}