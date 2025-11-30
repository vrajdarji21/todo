'use client'

import { Shield } from 'lucide-react'

export default function PermissionsSettings() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs animate-in fade-in duration-500">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-purple-600" />
          Roles & Permissions Matrix
        </h3>
        <p className="text-sm text-muted-foreground mt-1">Define what each role can access in the system.</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Module / Action</th>
              <th className="px-6 py-4 text-center">Super Admin</th>
              <th className="px-6 py-4 text-center">Team Lead</th>
              <th className="px-6 py-4 text-center">Employee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { name: 'View Dashboard', sa: true, tl: true, emp: true },
              { name: 'Create Projects', sa: true, tl: false, emp: false },
              { name: 'Assign Tasks', sa: true, tl: true, emp: false },
              { name: 'View All EODs', sa: true, tl: true, emp: false },
              { name: 'Edit Settings', sa: true, tl: false, emp: false },
            ].map((perm, i) => (
              <tr key={i} className="hover:bg-muted/30">
                <td className="px-6 py-4 font-medium">{perm.name}</td>
                <td className="px-6 py-4 text-center">
                  <input type="checkbox" checked={perm.sa} readOnly className="accent-blue-600 h-4 w-4 rounded" />
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="checkbox" defaultChecked={perm.tl} className="accent-blue-600 h-4 w-4 rounded" />
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="checkbox" defaultChecked={perm.emp} className="accent-blue-600 h-4 w-4 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}