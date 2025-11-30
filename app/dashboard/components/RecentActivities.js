'use client'

import { UserPlus, Folder, CheckCircle, MessageSquare, Calendar, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const activities = [
  {
    id: 1,
    type: 'user_added',
    user: 'Sarah Johnson',
    role: 'Frontend Developer',
    time: '2 hours ago',
    icon: UserPlus,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10'
  },
  {
    id: 2,
    type: 'project_assigned',
    user: 'Mike Chen',
    project: 'Mobile App Redesign',
    time: '4 hours ago',
    icon: Folder,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 3,
    type: 'task_completed',
    user: 'Emily Davis',
    task: 'User Authentication API',
    time: '6 hours ago',
    icon: CheckCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 4,
    type: 'task_update',
    user: 'Alex Rodriguez',
    task: 'Dashboard Analytics',
    progress: '75%',
    time: '8 hours ago',
    icon: MessageSquare,
    color: 'text-orange-600',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 5,
    type: 'meeting_scheduled',
    user: 'Team Lead',
    meeting: 'Sprint Planning',
    time: 'Tomorrow, 10:00 AM',
    icon: Calendar,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500/10'
  }
]

const getActivityMessage = (activity) => {
  switch (activity.type) {
    case 'user_added':
      return `New team member ${activity.user} joined as ${activity.role}`
    case 'project_assigned':
      return `${activity.user} was assigned to ${activity.project}`
    case 'task_completed':
      return `${activity.user} completed ${activity.task}`
    case 'task_update':
      return `${activity.user} updated ${activity.task} (${activity.progress})`
    case 'meeting_scheduled':
      return `${activity.meeting} scheduled by ${activity.user}`
    default:
      return 'Activity updated'
  }
}

export default function RecentActivities() {
  const [viewAll, setViewAll] = useState(false)

  const displayedActivities = viewAll ? activities : activities.slice(0, 3)

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Recent Activities</h3>
        <span className="text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded-md">
          Last 24 hours
        </span>
      </div>

      <div className="space-y-3">
        {displayedActivities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors cursor-pointer"
          >
            <div className={`h-8 w-8 rounded-lg ${activity.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight">
                {getActivityMessage(activity)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setViewAll(!viewAll)}
        className="w-full mt-4 flex items-center justify-center space-x-2 text-sm text-primary hover:text-primary/80 font-medium py-2 rounded-lg hover:bg-accent transition-colors"
      >
        <span>{viewAll ? 'Show Less' : 'View All Activities'}</span>
        <ArrowRight className={`h-4 w-4 transition-transform ${viewAll ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}