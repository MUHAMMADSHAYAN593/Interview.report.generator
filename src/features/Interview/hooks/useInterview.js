import {getAllInterviewReport , getInterviewReportById , generateInterviewReport } from '../services/Interview.api'
import { useContext } from 'react'
import { InterviewContext } from '../interview.context'

const normalizeApiError = (error, fallbackMessage) => {
    const status = error?.response?.status;
    const serverMessage = error?.response?.data?.error || error?.response?.data?.message;
    return {
        code: status ? String(status) : 'INTERVIEW_ERROR',
        message: serverMessage || error?.message || fallbackMessage,
    };
};

export const useInterview = () => {
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error('useInterview must be used within a InterviewProvider')
    }

    const {loading, setLoading, error, setError, report, setReport , reports, setReports} = context

    const generateReport = async ({ resume, selfdescription, jobdescription}) =>{
        setLoading(true)
        setError(null)
        try {
            const response = await generateInterviewReport({ resume, selfdescription, jobdescription})
            const generatedReport = response?.interviewReport ?? response?.interViewReport ?? null
            if (generatedReport) {
                setReport(generatedReport)
            }
            return generatedReport
        } catch (error) {
            console.log('Error generating interview report', error)
            setError(normalizeApiError(error, 'Unable to generate interview report right now.'))
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) =>{
        setLoading(true)
        setError(null)
        try {
            const response = await getInterviewReportById(interviewId)
            const interviewReport = response?.interviewReport ?? response?.interViewReport ?? null
            if (interviewReport) {
                setReport(interviewReport)
            }
            return interviewReport
        } catch (error) {
            console.log('Error getting interview report', error)
            setError(normalizeApiError(error, 'Unable to fetch this interview report.'))
            return null
        } finally {
            setLoading(false)
        }
    }

    const getAllReports = async () =>{
        setLoading(true)
        setError(null)
        try {
            const response = await getAllInterviewReport()
            const interviewReports = response?.interviewReports ?? response?.interViewReports ?? []
            setReports(interviewReports)
            return interviewReports
        } catch (error) {
            console.log('Error getting interview reports', error)
            setError(normalizeApiError(error, 'Unable to fetch your recent interview reports.'))
            return []
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        clearError: () => setError(null),
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports
    }
}
