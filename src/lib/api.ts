const API_URL = 'http://localhost:5000/api';

export const api = {
    async getJobs() {
        const res = await fetch(`${API_URL}/jobs`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
    },

    async submitApplication(data: any) {
        const res = await fetch(`${API_URL}/applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to submit application');
        return res.json();
    },

    async submitContact(data: any) {
        const res = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to submit contact form');
        return res.json();
    },

    async getTestimonials() {
        const res = await fetch(`${API_URL}/testimonials`);
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        return res.json();
    }
};
