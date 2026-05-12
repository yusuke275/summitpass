import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // プレミアム確認（Clerkメタデータ）
  const clerkUser = await currentUser()
  const plan = (clerkUser?.publicMetadata as { plan?: string })?.plan ?? 'free'
  if (plan !== 'premium') {
    return NextResponse.json(
      { error: 'この機能はプレミアムプランのみ利用できます', upgrade: true },
      { status: 403 }
    )
  }

  const body = await req.json()
  const { mountainName, elevation, climbedAt, duration, distance, weather, condition, notes } = body

  if (!mountainName || !notes) {
    return NextResponse.json({ error: 'mountainName and notes are required' }, { status: 400 })
  }

  const conditionMap: Record<string, string> = {
    excellent: '最高のコンディション', good: '良好', fair: 'まあまあ', poor: '悪天候',
  }

  const prompt = `あなたはプロの山岳ライターです。以下の登山記録をもとに、読み応えのある美しい登山レポートを日本語で書いてください。

【登山情報】
- 山名：${mountainName}（${elevation}m）
- 登山日：${climbedAt}
- 所要時間：${duration ? `${Math.floor(duration / 60)}時間${duration % 60}分` : '不明'}
- 距離：${distance ? `${distance}km` : '不明'}
- 天気：${weather || '記録なし'}
- コンディション：${conditionMap[condition] || condition}

【本人のメモ・感想】
${notes}

【レポートの要件】
- 400〜600文字程度の読みやすい文章
- 臨場感があり、読者が登山したくなるような内容
- 天気・景色・感情・困難と達成感を織り交ぜる
- 山の名称や標高を自然に含める
- 段落に分けて読みやすくする
- マークダウン記法は使わない`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const report = message.content[0].type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ report })
  } catch (error) {
    console.error('Anthropic API error:', error)
    return NextResponse.json({ error: 'AI report generation failed' }, { status: 500 })
  }
}
