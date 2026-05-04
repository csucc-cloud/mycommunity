'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { CheckCircle, Clock } from 'lucide-react'

export default function StudentAttendance() {
  const [activeEvents, setActiveEvents] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchEvents = async () => {
      // Fetch only "ongoing" events
      const { data } = await supabase.from('events').select('*').eq('status', 'ongoing')
      setActiveEvents(data || [])
    }
    fetchEvents()
  }, [])

  const checkIn = async (eventId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase.from('attendance').insert({
      event_id: eventId,
      student_id: user?.id,
      status: 'present'
    })

    if (error) alert("Already checked in!")
    else alert("Attendance marked successfully!")
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Live Event Check-in</h1>
      
      {activeEvents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
          <p className="text-gray-500">No active events to check into right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeEvents.map(event => (
            <div key={event.id} className="flex justify-between items-center p-4 bg-white border rounded-xl shadow-sm">
              <div>
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} /> Ongoing Now
                </p>
              </div>
              <button 
                onClick={() => checkIn(event.id)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <CheckCircle size={18} /> Check In
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
