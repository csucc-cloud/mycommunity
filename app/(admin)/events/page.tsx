'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../utils/supabase/client'
import { Activity, Users, MapPin } from 'lucide-react'

export default function AdminEventMonitor() {
  const [events, setEvents] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*, attendance(count)')
        .order('start_time', { ascending: true })
      setEvents(data || [])
    }
    fetchEvents()

    // Real-time listener for event updates or new attendees
    const channel = supabase.channel('event-monitor')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance' }, fetchEvents)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Event Monitoring</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Create Activity</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                event.status === 'ongoing' ? 'bg-green-100 text-green-700 animate-pulse' : 'bg-gray-100 text-gray-600'
              }`}>
                {event.status}
              </span>
              <Activity size={18} className="text-gray-400" />
            </div>
            
            <h3 className="text-lg font-bold mb-1">{event.title}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
              <MapPin size={14} /> {event.location}
            </p>

            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                <span className="text-sm font-medium">Attendance</span>
              </div>
              <span className="text-xl font-bold text-blue-700">
                {event.attendance?.[0]?.count || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
