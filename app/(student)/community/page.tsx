'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../utils/supabase/client'
import CreatePost from '../../../components/community/CreatePost'

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    // 1. Initial Fetch
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('community_posts')
        .select('*, profiles(full_name, avatar_url)')
        .order('created_at', { ascending: false })
      if (data) setPosts(data)
    }
    fetchPosts()

    // 2. Real-time Subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_posts' }, 
      (payload) => {
        setPosts((prev) => [payload.new, ...prev])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">School Community</h1>
      <CreatePost />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {post.is_anonymous ? <Ghost size={20}/> : post.profiles?.full_name[0]}
              </div>
              <div>
                <p className="font-semibold">{post.is_anonymous ? 'Anonymous Student' : post.profiles?.full_name}</p>
                <p className="text-xs text-gray-400">{new Date(post.created_at).toLocaleTimeString()}</p>
              </div>
            </div>
            <p className="text-gray-800">{post.content}</p>
            <div className="flex gap-6 mt-4 pt-3 border-t text-gray-500 text-sm">
              <button className="hover:text-blue-600">Like</button>
              <button className="hover:text-blue-600">Comment</button>
              <button className="hover:text-blue-600">Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
