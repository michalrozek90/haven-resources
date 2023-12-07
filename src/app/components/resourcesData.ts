export type TResource = {
  name: string
  respawnTime: number
}

// 1440 = 24 hours

export const RESOURCES_DATA: TResource[] = [
  { name: 'Ancient Windthrow', respawnTime: 12960 },
  { name: 'Clay Pit', respawnTime: 10080 },
  { name: 'Geyser', respawnTime: 4320 },
  { name: 'Heart of the Woods', respawnTime: 10080 },
  { name: 'Jotun Mussel', respawnTime: 20160 },
  { name: 'Lilypad Lotus', respawnTime: 20160 },
  { name: 'Rock Crystal', respawnTime: 123123 },
  { name: 'Fairy Stone', respawnTime: 4320 },
  { name: 'Salt Basin', respawnTime: 4320 },
]