import http from '../config/http'

export const studentApi = {
  findAll: () => http.get('/student'),
}
