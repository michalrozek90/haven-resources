import { useEffect, useState } from 'react'
import { TResource } from '@/app/components/resourcesData'

export const RespawnTimer = ({ resource }: { resource: TResource }) => {
  const getNextRespawnTime = () => {
    const storedRespawnTime = localStorage.getItem(resource.name)
    if (storedRespawnTime) {
      return new Date(storedRespawnTime).getTime()
    } else {
      const nextRespawnTime = new Date().getTime() + resource.respawnTime * 60000
      localStorage.setItem(resource.name, new Date(nextRespawnTime).toISOString())
      return nextRespawnTime
    }
  }

  const calculateTimeLeft = (nextRespawnTime: number) => {
    const currentTime = new Date().getTime()
    const timeLeft = Math.max(nextRespawnTime - currentTime, 0) // w milisekundach
    return Math.floor(timeLeft / 1000) // konwersja na sekundy
  }

  const nextRespawnTime = getNextRespawnTime()
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(() => calculateTimeLeft(nextRespawnTime))

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(nextRespawnTime)
      setTimeLeftInSeconds(timeLeft)
      if (timeLeft === 0) {
        const newNextRespawnTime = new Date().getTime() + resource.respawnTime * 60000
        localStorage.setItem(resource.name, new Date(newNextRespawnTime).toISOString())
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [nextRespawnTime, resource.name, resource.respawnTime])

  const days = Math.floor(timeLeftInSeconds / (60 * 60 * 24))
  const hours = Math.floor((timeLeftInSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((timeLeftInSeconds % (60 * 60)) / 60)
  const seconds = timeLeftInSeconds % 60

  return (
    <div className='flex justify-between text-[36px] gap-24'>
      <p>{resource.name}:</p>
      <p>
        {days}d {hours}h {minutes}min {seconds}s
      </p>
    </div>
  )
}
