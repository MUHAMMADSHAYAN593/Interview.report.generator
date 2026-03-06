import React, { useState , useEffect } from 'react'
import '../style/Interview.scss'
import { useInterview } from '../hooks/useInterview'
import { useParams, useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import Loading from '../../../components/Loading'
import ErrorPage from '../../../components/Error'

const NAV_ITEMS = [
  { id: 'technical',  label: 'Technical Questions', icon: '⚙️' },
  { id: 'behavioral', label: 'Behavioral Questions', icon: '💬' },
  { id: 'roadmap',    label: 'Preparation Roadmap',  icon: '🗺️' },
]

const severityConfig = {
  high:   { label: 'High',   color: '#f87171' },
  medium: { label: 'Medium', color: '#fbbf24' },
  low:    { label: 'Low',    color: '#34d399' },
}

const ScoreRing = ({ score }) => {
  const r = 54
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 75 ? '#34d399' : score >= 50 ? '#fbbf24' : '#f87171'
  return (
    <div className="score-ring">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#1e2130" strokeWidth="10" />
        <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ * 0.25}
          strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
      </svg>
      <div className="score-ring__inner">
        <span className="score-ring__num" style={{ color }}>{score}</span>
        <span className="score-ring__label">/ 100</span>
      </div>
    </div>
  )
}

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`q-card ${open ? 'q-card--open' : ''}`}>
      <button className="q-card__header" onClick={() => setOpen(!open)}>
        <span className="q-card__num">Q{index + 1}</span>
        <span className="q-card__question">{item.question}</span>
        <span className="q-card__chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="q-card__body">
          <div className="q-card__intention">
            <span className="q-card__intention-label">💡 Interviewer's Intent</span>
            <p>{item.intention}</p>
          </div>
          <div className="q-card__answer">
            <span className="q-card__answer-label">✅ How to Answer</span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical')
  const { loading, error, clearError, report , getReportById } = useInterview()
  const { handleLogout, loading: authLoading } = useAuth()
  const technicalQuestions = report?.technicalQuestions ?? []
  const behavioralQuestions = report?.behavioralQuestions ?? []
  const preparationPlan = report?.preparationPlan ?? []
  const skillGaps = report?.skillGaps ?? []
  const matchScore = typeof report?.matchScore === 'number' ? report.matchScore : 0
  const generatedAt = report?.createdAt ? new Date(report.createdAt) : new Date()
  const navCountById = {
    technical: technicalQuestions.length,
    behavioral: behavioralQuestions.length,
    roadmap: preparationPlan.length,
  }

  const { interviewId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  const onLogout = async () => {
    await handleLogout()
    navigate('/')
  }



  const renderContent = () => {
    if (activeNav === 'technical') return (
      <div className="content-section">
        <div className="content-section__header">
          <h2>Technical Questions</h2>
          <span className="content-section__badge">{technicalQuestions.length} questions</span>
        </div>
        <p className="content-section__subtitle">Click any question to reveal the interviewer's intent and a model answer.</p>
        <div className="q-list">
          {technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
        </div>
      </div>
    )

    if (activeNav === 'behavioral') return (
      <div className="content-section">
        <div className="content-section__header">
          <h2>Behavioral Questions</h2>
          <span className="content-section__badge">{behavioralQuestions.length} questions</span>
        </div>
        <p className="content-section__subtitle">Use the STAR method (Situation, Task, Action, Result) to structure your answers.</p>
        <div className="q-list">
          {behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
        </div>
      </div>
    )

    if (activeNav === 'roadmap') return (
      <div className="content-section">
        <div className="content-section__header">
          <h2>7-Day Preparation Roadmap</h2>
          <span className="content-section__badge">{preparationPlan.length} days</span>
        </div>
        <p className="content-section__subtitle">A structured daily plan to get you interview-ready in one week.</p>
        <div className="roadmap">
          {preparationPlan.map((day, i) => (
            <div className="roadmap__day" key={i}>
              <div className="roadmap__day-marker">
                <div className="roadmap__day-circle">{day.day}</div>
                {i < preparationPlan.length - 1 && <div className="roadmap__day-line" />}
              </div>
              <div className="roadmap__day-card">
                <h3 className="roadmap__day-focus">{day.focus}</h3>
                <ul className="roadmap__tasks">
                  {(day.tasks ?? []).map((task, j) => (
                    <li key={j} className="roadmap__task">
                      <span className="roadmap__task-dot" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (loading && !report) {
    return <Loading />
  }

  if (error) {
    return (
      <ErrorPage
        message={error.message}
        code={error.code}
        onRetry={() => {
          clearError()
          if (interviewId) {
            getReportById(interviewId)
          }
        }}
        onGoBack={() => {
          clearError()
          navigate('/')
        }}
      />
    )
  }

  return (
    <div className="report-page">

      {/* ── Left Nav ── */}
      <aside className="report-nav">
        <div className="report-nav__logo">
          <span className="report-nav__logo-icon">✦</span>
          Interview Report
        </div>
        <nav className="report-nav__links">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`report-nav__item ${activeNav === item.id ? 'report-nav__item--active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="report-nav__item-icon">{item.icon}</span>
              <span className="report-nav__item-label">{item.label}</span>
              <span className="report-nav__item-count">{navCountById[item.id]}</span>
            </button>
          ))}
        </nav>
        <div className="report-nav__footer">
          Generated on {generatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="report-main">
        {renderContent()}
      </main>

      {/* ── Right Sidebar ── */}
      <aside className="report-sidebar">

        {/* Match Score */}
        <div className="sidebar-card">
          <h3 className="sidebar-card__title">Match Score</h3>
          <ScoreRing score={matchScore} />
          <p className="sidebar-card__score-label">
            {matchScore >= 75 ? '🟢 Strong Match' : matchScore >= 50 ? '🟡 Moderate Match' : '🔴 Weak Match'}
          </p>
          <p className="sidebar-card__score-desc">
            Your profile is a <strong>{matchScore}%</strong> match for this role. Focus on the skill gaps below to improve.
          </p>
        </div>

        {/* Skill Gaps */}
        <div className="sidebar-card">
          <h3 className="sidebar-card__title">Skill Gaps</h3>
          <div className="skill-gaps">
            {skillGaps.map((gap, i) => {
              const cfg = severityConfig[gap.severity] ?? severityConfig.low
              return (
                <div className="skill-gap" key={i}>
                  <div className="skill-gap__top">
                    <span className="skill-gap__name">{gap.skill}</span>
                    <span className="skill-gap__badge" style={{ color: cfg.color, borderColor: cfg.color, background: `${cfg.color}15` }}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="skill-gap__bar-track">
                    <div className="skill-gap__bar-fill"
                      style={{ width: gap.severity === 'high' ? '85%' : gap.severity === 'medium' ? '50%' : '25%', background: cfg.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="sidebar-logout">
          <button
            type="button"
            className="sidebar-logout__btn"
            onClick={onLogout}
            disabled={authLoading}
          >
            {authLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>

      </aside>
    </div>
  )
}

export default Interview
