import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'
import { clerkClient } from '@clerk/nextjs/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const clerkUserId = session.metadata?.clerk_user_id
      if (clerkUserId) {
        // DBのプランをpremiumに更新
        await db.run(
          `UPDATE users SET plan = 'premium', stripe_customer_id = ?, stripe_subscription_id = ?, updated_at = datetime('now')
           WHERE clerk_id = ?`,
          [session.customer as string, session.subscription as string, clerkUserId]
        )
        // Clerkのメタデータも更新（アプリ内での即時反映用）
        const client = await clerkClient()
        await client.users.updateUserMetadata(clerkUserId, {
          publicMetadata: { plan: 'premium' },
        })
      }
      break
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      // DBのプランをfreeに戻す
      await db.run(
        `UPDATE users SET plan = 'free', stripe_subscription_id = NULL, updated_at = datetime('now')
         WHERE stripe_subscription_id = ?`,
        [subscription.id]
      )
      // Clerkメタデータも更新
      const customer = await stripe.customers.retrieve(subscription.customer as string)
      if (customer && !customer.deleted) {
        const users = await db.query<{ clerk_id: string }>(
          'SELECT clerk_id FROM users WHERE stripe_customer_id = ?',
          [subscription.customer]
        )
        const client = await clerkClient()
        for (const user of users) {
          await client.users.updateUserMetadata(user.clerk_id, {
            publicMetadata: { plan: 'free' },
          })
        }
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
