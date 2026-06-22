'use client'
import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
      const w = canvas.offsetWidth, h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#0B1828'
      ctx.fillRect(0, 0, w, h)

      const rim = ctx.createRadialGradient(w*.55, h*.28, 0, w*.55, h*.28, h*.52)
      rim.addColorStop(0,   'rgba(200,223,232,0.18)')
      rim.addColorStop(0.4, 'rgba(126,207,207,0.06)')
      rim.addColorStop(1,   'rgba(11,24,40,0)')
      ctx.fillStyle = rim; ctx.fillRect(0, 0, w, h)

      const shoulder = ctx.createRadialGradient(w*.4, h*.82, 0, w*.4, h*.82, h*.55)
      shoulder.addColorStop(0,   'rgba(126,207,207,0.09)')
      shoulder.addColorStop(0.5, 'rgba(74,90,114,0.05)')
      shoulder.addColorStop(1,   'rgba(11,24,40,0)')
      ctx.fillStyle = shoulder; ctx.fillRect(0, 0, w, h)

      ctx.save(); ctx.globalAlpha = 0.018
      for (let i = 0; i < 4000; i++) {
        ctx.fillStyle = Math.random() > .5 ? '#7ECFCF' : '#fff'
        ctx.fillRect(Math.random()*w, Math.random()*h, 1, 1)
      }
      ctx.restore()

      const vig = ctx.createRadialGradient(w/2, h/2, h*.2, w/2, h/2, h*.85)
      vig.addColorStop(0, 'rgba(11,24,40,0)')
      vig.addColorStop(1, 'rgba(11,24,40,0.72)')
      ctx.fillStyle = vig; ctx.fillRect(0, 0, w, h)
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return <canvas ref={ref} className="w-full h-full block" />
}
