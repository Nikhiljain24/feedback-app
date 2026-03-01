const API_BASE_URL = 'http://localhost:8000';

export const api = {
    get: async (endpoint: string) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || 'Network response was not ok');
        }
        return response.json();
    },

    post: async (endpoint: string, body: any, isFormData: boolean = false) => {
        const headers: Record<string, string> = {};
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: isFormData ? body : JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Network response was not ok');
        }
        return data;
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
