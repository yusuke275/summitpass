import type { Badge, Climb, User } from './types'

export function checkBadges(user: User, climbs: Climb[], existingBadges: string[]): string[] {
  const newBadges: string[] = []
  const mountainCount = climbs.length
  const totalElevation = user.total_elevation
  const climbedMountainIds = climbs.map(c => c.mountain_id)

  const checks: { id: string; condition: boolean }[] = [
    { id: 'badge_first', condition: mountainCount >= 1 },
    { id: 'badge_5peaks', condition: mountainCount >= 5 },
    { id: 'badge_10peaks', condition: mountainCount >= 10 },
    { id: 'badge_25peaks', condition: mountainCount >= 25 },
    { id: 'badge_50peaks', condition: mountainCount >= 50 },
    { id: 'badge_100peaks', condition: mountainCount >= 100 },
    { id: 'badge_fuji', condition: climbedMountainIds.includes('mt_fuji') },
    { id: 'badge_elevation_10000', condition: totalElevation >= 10000 },
    { id: 'badge_elevation_50000', condition: totalElevation >= 50000 },
  ]

  for (const check of checks) {
    if (check.condition && !existingBadges.includes(check.id)) {
      newBadges.push(check.id)
    }
  }

  return newBadges
}
