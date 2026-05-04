'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function StudentFinance() {
  const [message, setMessage] = useState('')
  const supabase = createClient()

  const submitInquiry = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase.from('inquiries').insert({
      user_id: user?.id,
      category: 'FINANCE',
      message: message,
      status: 'pending'
    })
    
    alert('Inquiry sent to the Finance Admin!')
    setMessage('')
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Finance & Fees</h1>
      
      {/* Fee Table Placeholder */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <div className="flex justify-between border-b pb-4 mb-4">
          <span>Tuition Fee - Q1</span>
          <span className="font-bold">$1,200.00</span>
        </div>
        <p className="text-sm text-red-500">Status: Unpaid</p>
      </div>

      {/* Inquiry Form */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-semibold mb-2">Have a question about your fees?</h3>
        <textarea 
          className="w-full p-3 rounded-lg border border-blue-200 mb-4"
          placeholder="Ask the Finance Dept..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
          onClick={submitInquiry}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Send Inquiry
        </button>
      </div>
    </div>
  )
}
