import api from './axios';

export const sportsTypesAPI = {
  getAll: () => api.get('/sports-types'),
  getById: (id) => api.get(`/sports-types/${id}`),
  create: (data) => api.post('/sports-types', data),
  update: (id, data) => api.put(`/sports-types/${id}`, data),
  delete: (id) => api.delete(`/sports-types/${id}`),
};
