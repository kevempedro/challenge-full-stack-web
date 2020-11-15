import http from '../config/http';

export const studentApi = {
  findAllStudents: () => http.get('/student'),
  createStudent: (data) => http.post('/student', data),
  updateStudent: (idStudent, data) => http.put(`/student/${idStudent}`, data),
  deleteStudent: (idStudent) => http.delete(`/student/${idStudent}`),
};
