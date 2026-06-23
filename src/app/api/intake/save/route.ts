import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { careType, answers } = await req.json()

    const cookieStore = await cookies()

    // Anon client — reads the user's session from cookie
    const anonClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: () => {},
        },
      }
    )

    const { data: { user }, error: authError } = await anonClient.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 })
    }

    // Service role client — bypasses RLS, safe because we verified the user above
    const adminClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    )

    const { error: insertError } = await adminClient
      .from('intake_submissions')
      .insert({ user_id: user.id, care_type: careType, answers })

    if (insertError) {
      console.error('intake_submissions insert error:', insertError)
      return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, userId: user.id })
  } catch (err) {
    console.error('intake save route error:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
