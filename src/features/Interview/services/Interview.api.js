import axios from 'axios'

const api = axios.create({  
    baseURL : 'http://localhost:3000',
    withCredentials : true
})
/**
 * @description Service to generate Interview Report based on selfdescription , resume , jondescription 
 */
export const generateInterviewReport = async ({ resume, selfdescription, jobdescription}) =>{
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('selfdescription', selfdescription);
    formData.append('jobdescription', jobdescription);
    const response = await api.post('/api/interview' , formData , {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data;

}

/**
 * @description Service to get interview report by interview Id
 */
export const getInterviewReportById = async (interviewId) =>{
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data;
}

/**
 * @description Service to get all interview reports of logged in user
 */

export const getAllInterviewReport = async () =>{
    const response = await api.get(`/api/interview`)
    return response.data;
}
