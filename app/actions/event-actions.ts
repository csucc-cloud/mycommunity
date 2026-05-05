'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createEvent(eventData: { title: string; location: string; start_time: string }) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('events').insert({
    ...eventData,
    status: 'planned'
  })

  if (error) throw error
  revalidatePath('/admin/events')
}

export async function markAttendance(eventId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase.from('attendance').insert({
    event_id: eventId,
    student_id: user?.id,
    status: 'present'
  })

  if (error) throw new Error("Already marked")
  revalidatePath('/student/attendance')
}
