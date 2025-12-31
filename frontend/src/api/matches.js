import api from './axios';

export const matchesAPI = {
  getAll: (params) => api.get('/matches', { params }),
  getById: (id) => api.get(`/matches/${id}`),
  create: (data) => api.post('/matches', data),
  update: (id, data) => api.put(`/matches/${id}`, data),
  updateScore: (id, data) => api.patch(`/matches/${id}/score`, data),
  delete: (id) => api.delete(`/matches/${id}`),
};
