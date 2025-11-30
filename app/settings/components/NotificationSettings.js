'use client'

import { Bell } from 'lucide-react'

export default function NotificationSettings({ settings, setSettings }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-xs animate-in fade-in duration-500 max-w-2xl">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Bell className="h-5 w-5 text-yellow-600" />
        Notification Preferences
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Email Alerts</p>
            <p className="text-xs text-muted-foreground">Receive updates via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.emailAlerts} 
              onChange={() => setSettings(prev => ({...prev, emailAlerts: !prev.emailAlerts}))} 
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Daily EOD Report</p>
            <p className="text-xs text-muted-foreground">Summary sent at 6:00 PM</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.dailyReport} 
              onChange={() => setSettings(prev => ({...prev, dailyReport: !prev.dailyReport}))} 
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )
}