import React,{useState, useRef, useEffect} from 'react'
import '../style/Home.scss'
import { Upload, Briefcase, User, Sparkles, Info } from 'lucide-react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import Loading from '../../../components/Loading'
import ErrorPage from '../../../components/Error'


const Home = () => {

    const {loading , error, clearError, generateReport , reports, getAllReports} = useInterview()

    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')

    const resumeInputref = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        getAllReports()
    }, [])

    const formatReportDate = (date) => {
        if (!date) return 'Unknown date'
        const parsed = new Date(date)
        if (Number.isNaN(parsed.getTime())) return 'Unknown date'
        return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const normalizeScore = (score) => {
        if (typeof score !== 'number') return null
        return Math.max(0, Math.min(100, Math.round(score)))
    }

    const scoreClass = (score) => {
        if (score === null) return ''
        if (score >= 75) return 'recent-reports__score--high'
        if (score >= 50) return 'recent-reports__score--medium'
        return 'recent-reports__score--low'
    }

    const handleGenerateReport = async () => {
        console.log("Generating Report")
        const resumeFile = resumeInputref.current.files[0]
        const data = await generateReport({
            resume: resumeFile,
            jobdescription: jobDescription,
            selfdescription: selfDescription
        })

        if (data?._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <ErrorPage
                message={error.message}
                code={error.code}
                onRetry={() => {
                    clearError()
                    getAllReports()
                }}
                onGoBack={() => {
                    clearError()
                    window.history.back()
                }}
            />
        )
    }

    return (
        <div className="app-container">
            <main className="content-wrapper">

                {/* Hero */}
                <section className="hero">
                    <div className="hero-badge">
                        <Sparkles size={12} />
                        AI-Powered Interview Prep
                    </div>
                    <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
                    <p className="hero-subtitle">
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </section>

                {/* Main Grid */}
                <div className="main-grid">

                    {/* Left: Job Description */}
                    <section className="panel target-jd">
                        <div className="panel-header">
                            <div className="title-group">
                                <div className="icon-wrap icon-wrap--pink">
                                    <Briefcase size={16} />
                                </div>
                                <h2>Target Job Description</h2>
                            </div>
                            <span className="badge badge-required">REQUIRED</span>
                        </div>
                        <div className="textarea-wrapper">
                            <textarea
                                onChange={(e)=>{
                                    setJobDescription(e.target.value)
                                }}

                                placeholder={"Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"}
                                maxLength={5000}
                            />
                            <div className="char-counter">0 / 5000</div>
                        </div>
                    </section>

                    {/* Right: Profile */}
                    <section className="panel user-profile">
                        <div className="panel-header">
                            <div className="title-group">
                                <div className="icon-wrap icon-wrap--pink">
                                    <User size={16} />
                                </div>
                                <h2>Your Profile</h2>
                            </div>
                        </div>

                        <div className="profile-content">

                            {/* Upload */}
                            <div className="section-label">
                                <label htmlFor="resume" className="upload-resume-trigger">Upload Resume</label>
                                <input hidden type="file" ref={resumeInputref} accept=".pdf" id='resume' name='resume'/>
                                <span className="badge badge-best">BEST RESULTS</span>
                            </div>

                            <label className="upload-zone" htmlFor="resume">
                                <div className="upload-placeholder">
                                    <div className="upload-icon-circle">
                                        <Upload size={22} />
                                    </div>
                                    <p className="main-text">Click to upload or drag & drop</p>
                                    <p className="sub-text">PDF or DOCX · Max 5MB</p>
                                </div>
                            </label>

                            {/* Divider */}
                            <div className="divider"><span>OR</span></div>

                            {/* Self description */}
                            <div className="self-desc-section">
                                <label className="section-label">
                                    <span>Quick Self-Description</span>
                                </label>
                                <textarea
                                    onChange={(e)=>{
                                        setSelfDescription(e.target.value)
                                    }}
                                    className="small-textarea"
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            {/* Info alert */}
                            <div className="info-alert">
                                <Info size={15} />
                                <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                            </div>

                        </div>
                    </section>
                </div>

                {/* Recent Reports List */}

                <section className="panel recent-reports">
                    <h2 className="recent-reports__title">My Recent Interview Reports</h2>
                    {reports.length === 0 ? (
                        <p className="recent-reports__empty">No reports yet. Generate your first strategy above.</p>
                    ) : (
                        <ul className="recent-reports__list">
                            {reports.map((reportItem) => {
                                const score = normalizeScore(reportItem.matchScore)
                                return (
                                <li key={reportItem._id} className="recent-reports__item">
                                    <button
                                        type="button"
                                        className="recent-reports__button"
                                        onClick={() => navigate(`/interview/${reportItem._id}`)}
                                    >
                                        <div className="recent-reports__top">
                                            <h3>{reportItem.tittle || reportItem.jobTitle || 'Untitled Role'}</h3>
                                            <span className={`recent-reports__score ${scoreClass(score)}`}>
                                                {score === null ? 'N/A' : `${score}%`}
                                            </span>
                                        </div>
                                        <p>Generated on {formatReportDate(reportItem.createdAt)}</p>
                                    </button>
                                </li>
                                )
                            })}
                        </ul>
                    )}
                </section>

                {/* Footer CTA */}
                <div className="action-footer">
                    <div className="generation-info">
                        <span className="gen-dot" />
                        AI-Powered Strategy Generation · ~30s
                    </div>
                    <button
                     onClick={handleGenerateReport}
                     disabled={loading}
                     className="primary-cta">
                        <Sparkles size={17} />
                        Generate My Interview Strategy
                    </button>
                </div>

                <footer className="site-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Help Center</a>
                </footer>

            </main>
        </div>
    )
}

export default Home
