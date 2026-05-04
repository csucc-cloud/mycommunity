'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Ghost, Send } from 'lucide-react'

export default function CreatePost() {
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const supabase = createClient()

  const handlePost = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('community_posts').insert({
      content,
      is_anonymous: isAnonymous,
      author_id: user.id
    })

    setContent('') // Clear input
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
      <textarea 
        className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        placeholder="What's happening in school?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-between items-center mt-3">
        <button 
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition ${isAnonymous ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}
        >
          <Ghost size={16} />
          {isAnonymous ? 'Posting Anonymously' : 'Post as yourself'}
        </button>
        <button 
          onClick={handlePost}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}
