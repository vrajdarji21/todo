'use client'

import { Building, Clock, Upload } from 'lucide-react'

export default function OrganizationSettings({ settings, onChange, isEditing }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-card border border-border rounded-xl p-6 shadow-xs">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-600" />
          Company Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <input 
              name="name" 
              value={settings.name} 
              onChange={onChange} 
              disabled={!isEditing}
              className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Official Email</label>
            <input 
              name="email" 
              value={settings.email} 
              onChange={onChange} 
              disabled={!isEditing}
              className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Company Logo</label>
            <div className={`border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${
              isEditing ? 'hover:bg-muted/50 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-muted/20'
            }`}>
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground/70">SVG, PNG, JPG (max. 800x400px)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-xs">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-600" />
          Work Configurations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Work Start Time</label>
            <input 
              type="time"
              name="workingHoursStart" 
              value={settings.workingHoursStart} 
              onChange={onChange} 
              disabled={!isEditing}
              className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Work End Time</label>
            <input 
              type="time"
              name="workingHoursEnd" 
              value={settings.workingHoursEnd} 
              onChange={onChange} 
              disabled={!isEditing}
              className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">EOD Submission Deadline</label>
            <input 
              type="time"
              name="eodSubmissionTime" 
              value={settings.eodSubmissionTime} 
              onChange={onChange} 
              disabled={!isEditing}
              className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}