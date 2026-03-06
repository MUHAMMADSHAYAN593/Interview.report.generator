import React, { useEffect, useState } from 'react'

const steps = [
  { icon: '📄', label: 'Parsing your resume...' },
  { icon: '🔍', label: 'Analyzing job requirements...' },
  { icon: '🧠', label: 'Identifying skill gaps...' },
  { icon: '💬', label: 'Generating interview questions...' },
  { icon: '🗺️', label: 'Building preparation roadmap...' },
  { icon: '✨', label: 'Finalizing your report...' },
]

const Loading = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 2200)
    return () => clearInterval(stepTimer)
  }, [])

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)
    return () => clearInterval(dotTimer)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090e',
        backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(100,80,220,0.15) 0%, transparent 65%)',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        colorScheme: 'dark',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '460px',
          padding: '24px',
        }}
      >

        {/* Spinner ring */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          {/* Outer glow pulse */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'rgba(236,72,153,0.15)',
              animation: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
          {/* Static track */}
          <svg width="96" height="96" viewBox="0 0 96 96" style={{ position: 'relative', display: 'block' }}>
            <circle cx="48" cy="48" r="40" fill="none" stroke="#1e2030" strokeWidth="6" />
            <circle
              cx="48" cy="48" r="40" fill="none"
              stroke="url(#spinGrad)" strokeWidth="6"
              strokeDasharray="180 72" strokeLinecap="round"
              style={{ transformOrigin: '48px 48px', animation: 'spin 1.1s linear infinite' }}
            />
            <defs>
              <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center icon */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              animation: 'stepPop 0.3s ease',
            }}
            key={currentStep}
          >
            {steps[currentStep].icon}
          </div>
        </div>

        {/* Title */}
        <h2 style={{ color: '#ffffff', fontSize: '30px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Generating Your Report
        </h2>
        <p style={{ color: '#7c7d92', fontSize: '14px', marginBottom: '28px', textAlign: 'center' }}>
          Our AI is crafting your personalized interview strategy
        </p>

        {/* Current step label */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '18px',
            padding: '8px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(236,72,153,0.2)',
            color: '#ec4899',
            background: 'rgba(236,72,153,0.08)',
            minHeight: '36px',
            minWidth: '260px',
            textAlign: 'center',
          }}
          key={currentStep}
        >
          {steps[currentStep].label.replace('...', '')}{dots}
        </div>

        {/* Steps progress */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {steps.map((step, i) => {
            const done    = i < currentStep
            const active  = i === currentStep
            const pending = i > currentStep
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: active ? 'rgba(236,72,153,0.08)' : done ? 'rgba(52,211,153,0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${active ? 'rgba(236,72,153,0.25)' : done ? 'rgba(52,211,153,0.18)' : 'rgba(255,255,255,0.05)'}`,
                  opacity: pending ? 0.4 : 1,
                  transform: active ? 'scale(1.01)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Status icon */}
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '11px',
                    fontWeight: 700,
                    background: done ? '#34d399' : active ? '#ec4899' : '#1e2030',
                    color: done || active ? '#fff' : '#52526a',
                  }}
                >
                  {done ? '✓' : active ? (
                    <span style={{ animation: 'spin 0.8s linear infinite', display: 'block', fontSize: '10px' }}>◐</span>
                  ) : i + 1}
                </div>

                <span style={{ fontSize: '12px', fontWeight: 500, color: done ? '#34d399' : active ? '#f0f0f8' : '#52526a', flex: 1 }}>
                  {step.label.replace('...', '')}
                </span>

                {done && <span style={{ color: '#34d399', fontSize: '12px' }}>✓</span>}
                {active && (
                  <span style={{ display: 'flex', gap: '2px' }}>
                    {[0,1,2].map(d => (
                      <span key={d} style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#ec4899',
                        animation: `bounce 0.8s ${d * 0.15}s ease infinite`,
                      }} />
                    ))}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', marginTop: '24px', borderRadius: '999px', overflow: 'hidden', height: '4px', background: '#1e2030' }}>
          <div
            style={{
              height: '100%',
              borderRadius: '999px',
              width: `${((currentStep + 1) / steps.length) * 100}%`,
              background: 'linear-gradient(90deg, #ec4899, #a855f7)',
              boxShadow: '0 0 10px rgba(236,72,153,0.5)',
              transition: 'all 0.7s ease',
            }}
          />
        </div>
        <p style={{ color: '#52526a', fontSize: '12px', marginTop: '8px' }}>
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            opacity: 0;
            transform: scale(2);
          }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes stepPop { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </div>
  )
}

export default Loading
