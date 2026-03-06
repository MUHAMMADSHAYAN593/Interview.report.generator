import React, { useState } from 'react'

// Pass these props from your app:
// message  - string  - the error message (optional, has default)
// code     - string  - error code like "500", "404", "AI_FAILURE" (optional)
// onRetry  - fn      - callback for retry button (optional)
// onGoBack - fn      - callback for go back button (optional)

const Error = ({
  message = "Something went wrong while generating your interview report. Our AI couldn't process your request.",
  code = "500",
  onRetry = () => window.location.reload(),
  onGoBack = () => window.history.back(),
}) => {
  const [hoveredBtn, setHoveredBtn] = useState(null)
  const suggestions = message?.toLowerCase().includes('resume')
    ? [
        { icon: '1', text: 'Upload your resume file before generating the report' },
        { icon: '2', text: 'Use a valid PDF file and try again' },
        { icon: '3', text: 'Make sure job description and self description are filled' },
      ]
    : [
        { icon: '1', text: 'Retry the request. This may be a temporary server issue' },
        { icon: '2', text: 'Check your internet connection and API server status' },
        { icon: '3', text: 'Refresh the page and submit again' },
      ]

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#09090e',
        backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,30,60,0.1) 0%, transparent 65%)',
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
          maxWidth: '520px',
          textAlign: 'center',
        }}
      >

        {/* Animated error icon */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          {/* Ripple rings */}
          {[1,2,3].map(i => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: `-${i * 14}px`,
                border: `1px solid rgba(239,68,68,${0.15 - i * 0.04})`,
                borderRadius: '50%',
                animation: `ripple 2s ${i * 0.3}s ease-out infinite`,
              }}
            />
          ))}

          {/* Icon circle */}
          <div
            style={{
              position: 'relative',
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
              border: '1px solid rgba(239,68,68,0.3)',
              boxShadow: '0 0 40px rgba(239,68,68,0.15)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </div>

        {/* Error code */}
        {code && (
          <div
            style={{
              color: '#ef4444',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              borderRadius: '999px',
              marginBottom: '20px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
          >
            Error {code}
          </div>
        )}

        {/* Heading */}
        <h1 style={{ color: '#ffffff', fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
          Something Went Wrong
        </h1>

        {/* Message */}
        <p style={{ color: '#8888a8', fontSize: '15px', lineHeight: 1.6, maxWidth: '400px', marginBottom: '32px' }}>
          {message}
        </p>

        {/* Suggestions */}
        <div
          style={{
            width: '100%',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'left',
            background: '#111119',
            border: '1px solid #1e2030',
          }}
        >
          <p style={{ color: '#52526a', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Things you can try
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {suggestions.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 700, marginTop: '2px', width: '12px', textAlign: 'center' }}>{item.icon}</span>
                <span style={{ color: '#8888a8', fontSize: '14px' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button
            onClick={onGoBack}
            onMouseEnter={() => setHoveredBtn('back')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              background: hoveredBtn === 'back' ? '#1e2030' : '#161622',
              border: '1px solid #2a2d42',
              color: '#c4c4d4',
              fontWeight: 600,
              cursor: 'pointer',
              transform: hoveredBtn === 'back' ? 'translateY(-1px)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Go Back
          </button>

          <button
            onClick={onRetry}
            onMouseEnter={() => setHoveredBtn('retry')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              background: hoveredBtn === 'retry' ? '#dc2626' : '#ef4444',
              border: 'none',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: hoveredBtn === 'retry' ? '0 8px 28px rgba(239,68,68,0.4)' : '0 4px 18px rgba(239,68,68,0.25)',
              transform: hoveredBtn === 'retry' ? 'translateY(-2px)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Try Again
          </button>
        </div>

        {/* Support link */}
        <p style={{ color: '#52526a', fontSize: '12px', marginTop: '16px' }}>
          Still having issues?{' '}
          <a href="#" style={{ color: '#8888a8', textDecoration: 'underline' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#8888a8'}>
            Contact support
          </a>
        </p>
      </div>

      <style>{`
        @keyframes ripple {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default Error
