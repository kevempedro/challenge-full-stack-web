import { createStudentService } from '../services/studentService';

export async function createStudentController(request, response) {
    try {
        const { academicRecord, name, email, cpf } = request.body;

        const result = await createStudentService({ academicRecord, name, email, cpf });

        return response.status(result.status).json(result.data);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            return response.status(err.status).json({ message: err.message });
        }

        return response.status(500).json({ message: err.message });
    }
}
