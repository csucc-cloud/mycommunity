'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Shield, User, Trash2 } from 'lucide-react'

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('role', { ascending: true })
      setUsers(data || [])
    }
    fetchUsers()
  }, [])

  const updateRole = async (userId: string, newRole: string) => {
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId)
    // Refresh local state
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">System User Management</h1>
      
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-sm">User</th>
              <th className="p-4 font-semibold text-sm">Current Role</th>
              <th className="p-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-none">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                    <User size={16} />
                  </div>
                  <span>{user.full_name || user.email}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                    user.role === 'super-admin' ? 'bg-red-100 text-red-700' : 
                    user.role === 'admin' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    className="text-sm border rounded p-1 outline-none"
                    value={user.role}
                    onChange={(e) => updateRole(user.id, e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
