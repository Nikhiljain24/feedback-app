import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.detail || error.message || 'An error occurred';
        throw new Error(message);
    }
);

export const api = {
    get: async (endpoint: string) => {
        return axiosInstance.get(endpoint);
    },

    post: async (endpoint: string, body: any, isFormData: boolean = false) => {
        const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
        return axiosInstance.post(endpoint, body, config);
    },
};

// Specific API services
export const FeedbackService = {
    getFeedbacks: () => api.get('/feedbacks'),
    createFeedback: (data: any) => api.post('/feedbacks', { ...data, upvotes: 0 }),
    upvoteFeedback: (id: number) => api.post(`/feedbacks/${id}/upvote`, {}),
};

export const AuthService = {
    login: (formData: FormData) => api.post('/auth/login', formData, true),
    signup: (data: any) => api.post('/auth/signup', data),
};
