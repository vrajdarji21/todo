'use client'

import { TrendingUp, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function ProductivityChart() {
  const [timeRange, setTimeRange] = useState('weekly')

  const data = {
    daily: [
      { day: 'Mon', completed: 45, assigned: 60 },
      { day: 'Tue', completed: 52, assigned: 65 },
      { day: 'Wed', completed: 48, assigned: 62 },
      { day: 'Thu', completed: 55, assigned: 68 },
      { day: 'Fri', completed: 58, assigned: 70 },
      { day: 'Sat', completed: 35, assigned: 45 },
      { day: 'Sun', completed: 25, assigned: 30 }
    ],
    weekly: [
      { day: 'W1', completed: 320, assigned: 400 },
      { day: 'W2', completed: 380, assigned: 450 },
      { day: 'W3', completed: 420, assigned: 480 },
      { day: 'W4', completed: 390, assigned: 460 }
    ],
    monthly: [
      { day: 'Jan', completed: 1500, assigned: 1800 },
      { day: 'Feb', completed: 1650, assigned: 1950 },
      { day: 'Mar', completed: 1720, assigned: 2050 },
      { day: 'Apr', completed: 1880, assigned: 2200 }
    ]
  }

  const currentData = data[timeRange]
  const maxValue = Math.max(...currentData.map(d => Math.max(d.completed, d.assigned)))

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Productivity Overview</h3>
        </div>
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {['daily', 'weekly', 'monthly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                timeRange === range 
                  ? 'bg-background text-foreground shadow-xs' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-xs">Assigned</span>
            </div>
          </div>
          <Calendar className="h-4 w-4" />
        </div>

        <div className="flex items-end justify-between h-40 gap-2">
          {currentData.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div className="flex items-end justify-center space-x-1 w-full h-32">
                <div 
                  className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                  style={{ height: `${(item.completed / maxValue) * 100}%` }}
                  title={`Completed: ${item.completed}`}
                ></div>
                <div 
                  className="w-full bg-purple-500 rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                  style={{ height: `${(item.assigned / maxValue) * 100}%` }}
                  title={`Assigned: ${item.assigned}`}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}