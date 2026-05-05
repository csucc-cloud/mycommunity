'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitInquiry(formData: { topic: string; message: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase.from('inquiries').insert({
    user_id: user.id,
    topic: formData.topic,
    message: formData.message,
    status: 'pending'
  })

  if (error) throw error
  revalidatePath('/student/finance')
}

export async function updatePaymentStatus(inquiryId: string, status: string) {
  const supabase = await createClient()
  // Security check: Ensure only admins can do this
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()

  if (profile?.role !== 'admin') throw new Error("Forbidden")

  await supabase.from('inquiries').update({ status }).eq('id', inquiryId)
  revalidatePath('/admin/finance')
}
