'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '58%', label: 'Increase in pick up point use', bg: '#c8f026', color: '#111' },
  { value: '23%', label: 'Decreased in customer phone calls', bg: '#a8d8f0', color: '#444' },
  { value: '27%', label: 'Increase in pick up point use', bg: '#c8f026', color: '#111' },
  { value: '40%', label: 'Decreased in customer phone calls', bg: '#a8d8f0', color: '#444' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const textLeftRef = useRef<HTMLDivElement>(null)
  const textRightRef = useRef<HTMLDivElement>(null)
  const stat0 = useRef<HTMLDivElement>(null)
  const stat1 = useRef<HTMLDivElement>(null)
  const stat2 = useRef<HTMLDivElement>(null)
  const stat3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !carRef.current) return
      const section = sectionRef.current

      // Car starts off screen left, moves to right
      gsap.set(carRef.current, { x: '-110vw' })

      // Car moves from left to right as we scroll
      gsap.to(carRef.current, {
        x: '110vw',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Letter animations
      const leftLetters = textLeftRef.current?.querySelectorAll('span')
      if (leftLetters) {
        gsap.set(leftLetters, { opacity: 0 })
        gsap.to(leftLetters, {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }

      const rightLetters = textRightRef.current?.querySelectorAll('span')
      if (rightLetters) {
        gsap.set(rightLetters, { opacity: 0 })
        gsap.to(rightLetters, {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }

      // Stat cards
      const statEls = [stat0.current, stat1.current, stat2.current, stat3.current]
      statEls.forEach((el, i) => {
        if (!el) return
        const startPct = 5 + i * 15
        const endPct = startPct + 18
        gsap.set(el, { opacity: 0, y: i % 2 === 0 ? -40 : 40 })
        gsap.to(el, {
          opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: section, start: `${startPct}% top`, end: `${endPct}% top`, scrub: 1 },
        })
        gsap.to(el, {
          opacity: 0, y: i % 2 === 0 ? -40 : 40, ease: 'none',
          scrollTrigger: { trigger: section, start: `${72 + i * 5}% top`, end: `${86 + i * 3}% top`, scrub: 1 },
        })
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={sectionRef} className="relative w-full" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: '#d4d4d4' }}>

          {/* Split background */}
          <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: '#3ecf5a' }} />
          <div className="absolute inset-y-0 right-0 w-1/2" style={{ background: '#1a1a1a' }} />

          {/* Headline band — the "road" */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              height: 'clamp(100px, 18vw, 200px)',
              zIndex: 10,
            }}
          >
            {/* Band fill: dark on left, green on right (inverted from bg) */}
            <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: '#111' }} />
            <div className="absolute inset-y-0 right-0 w-1/2" style={{ background: '#3ecf5a' }} />

            {/* Text clipped to left half: white */}
            <div
              ref={textLeftRef}
              className="absolute inset-0 flex items-center pl-6 md:pl-12"
              style={{
                clipPath: 'inset(0 50% 0 0)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 13vw, 150px)',
                fontWeight: 900,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                color: '#f0ede8',
                letterSpacing: '-0.01em',
              }}
            >
              {'WELCOME ITZFIZZ'.split('').map((letter, i) => (
                <span key={i} className="inline-block">
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>

            {/* Text clipped to right half: dark */}
            <div
              ref={textRightRef}
              className="absolute inset-0 flex items-center pl-6 md:pl-12"
              style={{
                clipPath: 'inset(0 0 0 50%)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 13vw, 150px)',
                fontWeight: 900,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                color: '#111',
                letterSpacing: '-0.01em',
              }}
            >
              {'WELCOME ITZFIZZ'.split('').map((letter, i) => (
                <span key={i} className="inline-block">
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
          </div>

          {/* Car — rides along the band */}
          <div
            ref={carRef}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(260px, 34vw, 500px)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <img
              src="/car.png"
              alt="McLaren 720S"
              className="w-full h-auto"
              draggable={false}
            />
          </div>

          {/* Stat cards */}
          {/* Top right */}
          <div ref={stat0} className="absolute rounded-2xl p-6 shadow-2xl" style={{ top: '7%', right: '5%', width: 'clamp(180px, 20vw, 300px)', background: stats[0].bg, zIndex: 30 }}>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontFamily: 'var(--font-display)', fontWeight: 900, color: stats[0].color, lineHeight: 1 }}>{stats[0].value}</div>
            <div style={{ fontSize: '0.9rem', color: stats[0].color, marginTop: '0.4rem', fontFamily: 'var(--font-body)', opacity: 0.8 }}>{stats[0].label}</div>
          </div>

          {/* Bottom right */}
          <div ref={stat1} className="absolute rounded-2xl p-6 shadow-2xl" style={{ bottom: '7%', right: '7%', width: 'clamp(180px, 20vw, 300px)', background: stats[1].bg, zIndex: 30 }}>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontFamily: 'var(--font-display)', fontWeight: 900, color: stats[1].color, lineHeight: 1 }}>{stats[1].value}</div>
            <div style={{ fontSize: '0.9rem', color: stats[1].color, marginTop: '0.4rem', fontFamily: 'var(--font-body)', opacity: 0.8 }}>{stats[1].label}</div>
          </div>

          {/* Top left */}
          <div ref={stat2} className="absolute rounded-2xl p-6 shadow-2xl" style={{ top: '7%', left: '5%', width: 'clamp(180px, 20vw, 300px)', background: stats[2].bg, zIndex: 30 }}>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontFamily: 'var(--font-display)', fontWeight: 900, color: stats[2].color, lineHeight: 1 }}>{stats[2].value}</div>
            <div style={{ fontSize: '0.9rem', color: stats[2].color, marginTop: '0.4rem', fontFamily: 'var(--font-body)', opacity: 0.8 }}>{stats[2].label}</div>
          </div>

          {/* Bottom left */}
          <div ref={stat3} className="absolute rounded-2xl p-6 shadow-2xl" style={{ bottom: '7%', left: '7%', width: 'clamp(180px, 20vw, 300px)', background: stats[3].bg, zIndex: 30 }}>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontFamily: 'var(--font-display)', fontWeight: 900, color: stats[3].color, lineHeight: 1 }}>{stats[3].value}</div>
            <div style={{ fontSize: '0.9rem', color: stats[3].color, marginTop: '0.4rem', fontFamily: 'var(--font-body)', opacity: 0.8 }}>{stats[3].label}</div>
          </div>

        </div>
      </section>

      {/* Below hero */}
      <section style={{ background: '#111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 3rem' }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: '#f0ede8', lineHeight: 1.1, marginBottom: '2rem' }}>
            We craft digital experiences that move people
          </p>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.8, maxWidth: '600px' }}>
            ITZFIZZ is a premium digital studio specializing in motion-rich interfaces, scroll-driven narratives, and bold brand identities.
          </p>
          <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {['Motion Design', 'Brand Identity', 'Digital Products'].map((title, i) => (
              <div key={i} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3ecf5a', marginBottom: '0.75rem' }}>0{i + 1}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#f0ede8' }}>{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}