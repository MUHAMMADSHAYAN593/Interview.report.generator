import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'


// ── Inline SVG icons ──────────────────────────────────────
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

// ── Data ─────────────────────────────────────────────────
const features = [
  { icon: '⚙️', title: 'Technical Deep-Dive', desc: 'AI generates role-specific technical questions tailored to your exact tech stack and seniority level.' },
  { icon: '💬', title: 'Behavioral Coaching', desc: 'Master STAR-method answers for the behavioral questions that actually get asked in modern interviews.' },
  { icon: '📊', title: 'Match Score Analysis', desc: 'Instantly see how well your profile aligns with the role and where the gaps are — with severity ratings.' },
  { icon: '🗺️', title: '7-Day Roadmap', desc: 'A structured daily preparation plan targeting your weakest areas so you walk in confident.' },
  { icon: '🧠', title: 'Skill Gap Detection', desc: 'Pinpoint exactly which skills you\'re missing and prioritize what to learn before interview day.' },
  { icon: '⚡', title: 'Instant Generation', desc: 'Upload resume, paste JD, get a complete tailored report in under 30 seconds. No fluff, pure signal.' },
]

const steps = [
  { num: '01', title: 'Upload Your Resume', desc: 'Drop in your PDF or DOCX resume and add a quick self-description.' },
  { num: '02', title: 'Paste Job Description', desc: 'Copy the job posting you\'re targeting — the more detail, the sharper the analysis.' },
  { num: '03', title: 'Get Your Report', desc: 'Receive a complete interview strategy: questions, answers, gaps, and a day-by-day prep plan.' },
]

const testimonials = [
  { name: 'Sarah K.', role: 'Frontend Engineer', company: 'Got offer @ Stripe', text: 'The technical questions were scarily accurate. Every single one came up in my actual interview.', score: 5 },
  { name: 'James O.', role: 'Full Stack Dev', company: 'Got offer @ Shopify', text: 'The skill gap section told me exactly what to study. I went from failing rounds to passing 4 in a row.', score: 5 },
  { name: 'Priya M.', role: 'Backend Engineer', company: 'Got offer @ Notion', text: 'Used it the night before my interview. The STAR answers were perfect — I just had to personalize them.', score: 5 },
]

// ── Floating mockup card ──────────────────────────────────
const MockupCard = () => (
  <div style={{
    background: '#111119',
    border: '1px solid #1e2030',
    borderRadius: '16px',
    padding: '20px',
    width: '340px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
  }}>
    {/* Header */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#8888a8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Match Score</span>
      <span style={{ fontSize: '10px', fontWeight: 700, color: '#e53e3e', background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.2)', padding: '3px 8px', borderRadius: '5px' }}>LIVE</span>
    </div>
    {/* Score */}
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
      <span style={{ fontSize: '52px', fontWeight: 800, color: '#f59e0b', lineHeight: 1, fontFamily: 'Syne, sans-serif' }}>87</span>
      <span style={{ fontSize: '14px', color: '#52526a', marginBottom: '8px', fontWeight: 600 }}>/ 100</span>
      <span style={{ marginBottom: '8px', fontSize: '11px', color: '#34d399', fontWeight: 700, background: 'rgba(52,211,153,0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(52,211,153,0.2)' }}>Strong Match</span>
    </div>
    {/* Bar */}
    <div style={{ height: '6px', background: '#1e2030', borderRadius: '100px', marginBottom: '20px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: '87%', background: 'linear-gradient(90deg, #e53e3e, #f59e0b)', borderRadius: '100px' }} />
    </div>
    {/* Questions preview */}
    {[
      'Explain your approach to microservices...',
      'How do you handle state in large React apps?',
      'Describe a system design challenge you faced...',
    ].map((q, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#161622', borderRadius: '9px', marginBottom: '6px' }}>
        <span style={{ fontSize: '10px', fontWeight: 800, color: '#e53e3e', background: 'rgba(229,62,62,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Q{i+1}</span>
        <span style={{ fontSize: '11px', color: '#8888a8', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q}</span>
      </div>
    ))}
    <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(229,62,62,0.06)', border: '1px solid rgba(229,62,62,0.15)', borderRadius: '9px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '11px', color: '#e53e3e', fontWeight: 600 }}>⚡ 3 skill gaps detected</span>
    </div>
  </div>
)

// ── Main Component ────────────────────────────────────────
const Landing = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 50) }, [])

  const navigate = useNavigate()
  const handllenavigate = () => {
    navigate('/register')
  }

  return (
    <div style={{
      background: '#09090e',
      color: '#e4e4f0',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      minHeight: '100vh',
      overflowX: 'hidden',
      colorScheme: 'dark',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #09090e !important; }

        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.45s; }
        .delay-5 { transition-delay: 0.6s; }

        .feature-card { transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
        .feature-card:hover {
          border-color: rgba(229,62,62,0.3) !important;
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(229,62,62,0.1);
        }

        .step-card { transition: border-color 0.2s, background 0.2s; }
        .step-card:hover { border-color: rgba(229,62,62,0.25) !important; background: #161622 !important; }

        .testi-card { transition: border-color 0.2s, transform 0.2s; }
        .testi-card:hover { border-color: #2a2d42 !important; transform: translateY(-3px); }

        .cta-btn { transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
        .cta-btn:hover { background: #c53030 !important; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(229,62,62,0.45) !important; }
        .cta-btn:active { transform: translateY(0); }

        .ghost-btn { transition: background 0.2s, border-color 0.2s, color 0.2s; }
        .ghost-btn:hover { background: #161622 !important; border-color: #363a55 !important; color: #fff !important; }

        /* Diagonal grid texture */
        .grid-texture {
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .float { animation: float 5s ease-in-out infinite; }

        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #fff !important; }
      `}</style>

      {/* ── Navbar ─────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: '64px',
        background: 'rgba(9,9,14,0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#e53e3e', fontSize: '18px' }}>✦</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', color: '#fff', letterSpacing: '0.01em' }}>PrepAI</span>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Features', 'How it works', 'Testimonials'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} className="nav-link"
              style={{ fontSize: '13px', fontWeight: 500, color: '#8888a8', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <button className="cta-btn" style={{
          background: '#e53e3e', color: '#fff', border: 'none', cursor: 'pointer',
          fontSize: '13px', fontWeight: 700, padding: '8px 20px', borderRadius: '9px',
          boxShadow: '0 4px 16px rgba(229,62,62,0.3)',
        }}>Get Started Free</button>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="grid-texture" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 48px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glows */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(229,62,62,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '200px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(100,80,220,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1160px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '60px', justifyContent: 'space-between' }}>

          {/* Left text */}
          <div style={{ flex: 1, maxWidth: '560px' }}>
            <div className={`fade-up ${mounted ? 'visible' : ''}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#e53e3e', background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.2)',
              padding: '6px 14px', borderRadius: '100px', marginBottom: '28px',
            }}>
              <span style={{ width: '6px', height: '6px', background: '#e53e3e', borderRadius: '50%', boxShadow: '0 0 8px #e53e3e', animation: 'pulse-glow 1.8s ease infinite' }} />
              AI-Powered Interview Intelligence
            </div>

            <h1 className={`fade-up delay-1 ${mounted ? 'visible' : ''}`} style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: 1.0,
              color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '24px',
            }}>
              Ace Every<br />
              <span style={{ color: '#e53e3e', position: 'relative' }}>
                Interview
                <svg style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%' }} viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,6 Q50,0 100,5 Q150,10 200,4" stroke="#e53e3e" strokeWidth="2.5" fill="none" opacity="0.5"/>
                </svg>
              </span>
              <br />With AI
            </h1>

            <p className={`fade-up delay-2 ${mounted ? 'visible' : ''}`} style={{
              fontSize: '17px', color: '#8888a8', lineHeight: 1.75,
              marginBottom: '40px', fontWeight: 300, maxWidth: '460px',
            }}>
              Upload your resume, paste the job description — get a complete tailored interview report with questions, answers, skill gaps, and a preparation roadmap in seconds.
            </p>

            <div className={`fade-up delay-3 ${mounted ? 'visible' : ''}`} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <button
              onClick={handllenavigate}
              
               className="cta-btn" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#e53e3e', color: '#fff', border: 'none', cursor: 'pointer',
                fontSize: '15px', fontWeight: 700, padding: '14px 28px', borderRadius: '12px',
                boxShadow: '0 6px 24px rgba(229,62,62,0.35)',
              }}>
                Generate My Report <IconArrow />
              </button>
              <button className="ghost-btn" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', color: '#8888a8',
                border: '1px solid #252838', cursor: 'pointer',
                fontSize: '15px', fontWeight: 500, padding: '14px 28px', borderRadius: '12px',
              }}>
                See how it works
              </button>
            </div>

            {/* Social proof */}
            <div className={`fade-up delay-4 ${mounted ? 'visible' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex' }}>
                {['#e53e3e','#f59e0b','#34d399','#60a5fa','#a78bfa'].map((c, i) => (
                  <div key={i} style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: c, border: '2px solid #09090e',
                    marginLeft: i ? '-8px' : 0, opacity: 0.85,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 700, color: '#fff',
                  }}>{String.fromCharCode(65 + i)}</div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#f59e0b' }}><IconStar /></span>)}
                </div>
                <span style={{ fontSize: '12px', color: '#52526a', fontWeight: 500 }}>Trusted by 2,400+ developers</span>
              </div>
            </div>
          </div>

          {/* Right mockup */}
          <div className={`fade-up delay-5 ${mounted ? 'visible' : ''} float`} style={{ flexShrink: 0 }}>
            <MockupCard />
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" style={{ padding: '100px 48px', maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e53e3e', display: 'block', marginBottom: '16px' }}>What you get</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '16px' }}>
            Everything you need<br />to land the role
          </h2>
          <p style={{ fontSize: '16px', color: '#8888a8', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
            One report. All the insights. Zero guesswork.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{
              background: '#111119', border: '1px solid #1e2030',
              borderRadius: '16px', padding: '28px',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '11px', fontSize: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.15)',
                marginBottom: '18px',
              }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{f.title}</h3>
              <p style={{ fontSize: '13.5px', color: '#52526a', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section id="how-it-works" style={{ padding: '80px 48px', background: '#0d0d14', borderTop: '1px solid #1e2030', borderBottom: '1px solid #1e2030' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e53e3e', display: 'block', marginBottom: '16px' }}>Simple process</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              3 steps to interview-ready
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {steps.map((s, i) => (
              <div key={i} className="step-card" style={{ background: '#111119', border: '1px solid #1e2030', borderRadius: '16px', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                {/* Big number watermark */}
                <div style={{ position: 'absolute', top: '-10px', right: '16px', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '80px', color: 'rgba(229,62,62,0.06)', lineHeight: 1, userSelect: 'none' }}>{s.num}</div>
                <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', color: '#e53e3e', marginBottom: '16px' }}>{s.num}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '12px', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#52526a', lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', right: '-12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, color: '#e53e3e', fontSize: '18px' }}>›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section id="testimonials" style={{ padding: '100px 48px', maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e53e3e', display: 'block', marginBottom: '16px' }}>Real results</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Developers who got<br />the offer
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card" style={{ background: '#111119', border: '1px solid #1e2030', borderRadius: '16px', padding: '28px' }}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                {Array(t.score).fill(0).map((_, j) => <span key={j} style={{ color: '#f59e0b' }}><IconStar /></span>)}
              </div>
              <p style={{ fontSize: '14px', color: '#c4c4d4', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic', fontWeight: 300 }}>"{t.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#52526a' }}>{t.role}</div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#34d399', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)', padding: '3px 9px', borderRadius: '6px' }}>
                  {t.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <section style={{ padding: '0 48px 100px' }}>
        <div style={{
          maxWidth: '1160px', margin: '0 auto',
          background: 'linear-gradient(135deg, #1a0a0a 0%, #0f0f1a 50%, #09090e 100%)',
          border: '1px solid rgba(229,62,62,0.2)',
          borderRadius: '24px', padding: '72px 64px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '200px', background: 'radial-gradient(ellipse, rgba(229,62,62,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 56px)', color: '#fff', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
            Your next offer is<br />one report away.
          </h2>
          <p style={{ fontSize: '17px', color: '#8888a8', marginBottom: '40px', fontWeight: 300, lineHeight: 1.7 }}>
            Free to use. No credit card. Results in 30 seconds.
          </p>

          <button
          onClick={handllenavigate}
          
            className="cta-btn" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: '#e53e3e', color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: '16px', fontWeight: 700, padding: '16px 36px', borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(229,62,62,0.4)',
          }}>
            Generate My Interview Report <IconArrow />
          </button>

          {/* Checklist */}
          <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
            {['Free forever', 'No signup required', 'Instant results'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: '#52526a', fontWeight: 500 }}>
                <span style={{ color: '#34d399' }}><IconCheck /></span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid #1e2030', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#e53e3e' }}>✦</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '14px', color: '#fff' }}>PrepAI</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms', 'Help'].map(l => (
            <a key={l} className="nav-link" href="#" style={{ fontSize: '13px', color: '#52526a', textDecoration: 'none', fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#52526a' }}>© 2026 PrepAI. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Landing