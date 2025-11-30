'use client'

import { useState } from 'react'
import { Database, Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import Toast from '@/components/ui/Toast' 

// Reusable Component for managing a list (Departments or Designations)
const MasterSection = ({ title, icon: Icon, iconColor, initialData }) => {
  const [items, setItems] = useState(initialData)
  const [isAdding, setIsAdding] = useState(false)
  const [newItemValue, setNewItemValue] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)
  const [editValue, setEditValue] = useState('')
  
  // Local Toast State
  const [toast, setToast] = useState(null)

  // --- Actions ---

  const handleAdd = () => {
    if (!newItemValue.trim()) return
    setItems([...items, newItemValue])
    setNewItemValue('')
    setIsAdding(false)
    setToast({ message: `${title.slice(0, -1)} added successfully`, type: 'success' })
  }

  const handleDelete = (index) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const newItems = items.filter((_, i) => i !== index)
      setItems(newItems)
      setToast({ message: 'Item deleted', type: 'success' })
    }
  }

  const startEdit = (index, currentVal) => {
    setEditingIndex(index)
    setEditValue(currentVal)
  }

  const saveEdit = (index) => {
    if (!editValue.trim()) return
    const newItems = [...items]
    newItems[index] = editValue
    setItems(newItems)
    setEditingIndex(null)
    setToast({ message: 'Updated successfully', type: 'success' })
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditValue('')
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-xs relative">
      {/* Render Toast Component */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Icon className={`h-4 w-4 ${iconColor}`} />
          {title}
        </h3>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs flex items-center gap-1 bg-muted hover:bg-muted/80 px-2 py-1 rounded transition-colors"
          >
            <Plus className="h-3 w-3 " /> Add New
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {/* ADD NEW ROW */}
        {isAdding && (
          <li className="flex justify-between items-center p-2 border border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20 rounded-lg animate-in fade-in slide-in-from-top-2">
            <input 
              autoFocus
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              placeholder="Enter name..."
              className="text-sm bg-transparent border-none focus:outline-none w-full mr-2"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <div className="flex gap-2">
              <button onClick={handleAdd} className="p-1 hover:bg-green-100 text-green-600 rounded">
                <Check className="h-3 w-3" />
              </button>
              <button onClick={() => setIsAdding(false)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                <X className="h-3 w-3" />
              </button>
            </div>
          </li>
        )}

        {/* LIST ITEMS */}
        {items.map((item, i) => (
          <li key={i} className="flex justify-between items-center p-2 border border-border rounded-lg bg-background hover:bg-accent/30 transition-colors group">
            {editingIndex === i ? (
              // EDIT MODE
              <>
                <input 
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="text-sm bg-background border border-blue-500 rounded px-1 w-full mr-2 focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(i)}
                />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(i)} className="p-1 hover:bg-green-100 text-green-600 rounded">
                    <Check className="h-3 w-3" />
                  </button>
                  <button onClick={cancelEdit} className="p-1 hover:bg-red-100 text-red-600 rounded">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </>
            ) : (
              // VIEW MODE
              <>
                <span className="text-sm">{item}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => startEdit(i, item)}
                    className="text-blue-600 hover:text-blue-600 hover:bg-blue-50 p-1 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button 
                    onClick={() => handleDelete(i)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-600 p-1 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Main Component
export default function MasterDataSettings() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
      <MasterSection 
        title="Departments" 
        icon={Database} 
        iconColor="text-pink-600"
        initialData={['Engineering', 'Design', 'Marketing', 'Sales', 'HR']}
      />
      
      <MasterSection 
        title="Designations" 
        icon={Database} 
        iconColor="text-cyan-600"
        initialData={['Senior Developer', 'Junior Developer', 'UI/UX Designer', 'Project Manager', 'QA Tester']}
      />
    </div>
  )
}