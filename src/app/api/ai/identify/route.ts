import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // プレミアム確認
  const clerkUser = await currentUser()
  const plan = (clerkUser?.publicMetadata as { plan?: string })?.plan ?? 'free'
  if (plan !== 'premium') {
    return NextResponse.json(
      { error: 'この機能はプレミアムプランのみ利用できます', upgrade: true },
      { status: 403 }
    )
  }

  const formData = await req.formData()
  const imageFile = formData.get('image') as File | null

  if (!imageFile) {
    return NextResponse.json({ error: 'image is required' }, { status: 400 })
  }

  const arrayBuffer = await imageFile.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  const mediaType = imageFile.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            {
              type: 'text',
              text: `この写真に写っている山を識別してください。
日本の山であれば山名・標高・都道府県を教えてください。
山が写っていない場合は「山は写っていません」と答えてください。
不確かな場合は「おそらく〜」と表現してください。
回答は2〜3文で簡潔にまとめてください。`,
            },
          ],
        },
      ],
    })

    const result = message.content[0].type === 'text' ? message.content[0].text : '識別できませんでした'
    return NextResponse.json({ result })
  } catch (error) {
    console.error('Anthropic API error:', error)
    return NextResponse.json({ error: 'AI identification failed' }, { status: 500 })
  }
}
