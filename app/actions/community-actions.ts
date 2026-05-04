// actions/community-actions.ts
'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createPost(content: string, isAnonymous: boolean) {
  const supabase = await createClient()
  
  // 1. Authentication Check
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error("Unauthorized")

  // 2. Content Sanitization (Security against XSS)
  const cleanContent = content.trim().replace(/<[^>]*>?/gm, '') 
  
  if (cleanContent.length < 3) throw new Error("Post too short")
  if (cleanContent.length > 500) throw new Error("Post too long")

  // 3. Secure Database Insert
  const { error } = await supabase.from('community_posts').insert({
    content: cleanContent,
    is_anonymous: isAnonymous,
    author_id: user.id // Always use the verified user ID from the server
  })

  if (!error) {
    revalidatePath('/student/community')
  }
}
