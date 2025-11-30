import { Folder, Activity, CheckCircle, Users, UserCheck, Target, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Total Projects',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: Folder,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  {
    title: 'Active Projects',
    value: '18',
    change: '+5%',
    trend: 'up',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  {
    title: 'Completed',
    value: '6',
    change: '+2%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  {
    title: 'Team Members',
    value: '48',
    change: '+8%',
    trend: 'up',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-200 dark:border-orange-800'
  },
  {
    title: 'Team Leads',
    value: '12',
    change: '+3%',
    trend: 'up',
    icon: UserCheck,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-200 dark:border-indigo-800'
  },
  {
    title: 'Productivity',
    value: '87%',
    change: '+4%',
    trend: 'up',
    icon: Target,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-200 dark:border-cyan-800'
  }
]

export default function ProjectStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-card rounded-xl border border-border p-4 shadow-xs hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className={`text-xs mt-1 flex items-center ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </div>
            <div className={`h-10 w-10 rounded-lg ${stat.bgColor} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}