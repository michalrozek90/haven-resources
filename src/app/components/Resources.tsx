'use client'
import { RespawnTimer } from '@/app/components/RespawnTimer'
import { useEffect, useState } from 'react'
import { RESOURCES_DATA } from '@/app/components/resourcesData'

export default function Resources() {
  const [resourcesToRespawn, setResourcesToRespawn] = useState<number>(0)
  console.log('resourcesToRespawn:', resourcesToRespawn)

  useEffect(() => {
    const checkRespawns = () => {
      const count = RESOURCES_DATA.filter((r) => r.respawnTime <= 60).length
      setResourcesToRespawn(count)
      document.title = count > 0 ? `(${count}) Resources` : 'Resources'
    }

    const interval = setInterval(checkRespawns, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col max-w-full min-w-[600px]'>
      {RESOURCES_DATA.map((resource) => (
        <RespawnTimer key={resource.name} resource={resource} />
      ))}
    </div>
  )
}
