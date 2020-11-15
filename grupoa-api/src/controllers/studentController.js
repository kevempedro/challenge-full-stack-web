import {
    findAllStudentService,
    createStudentService,
    updateStudentService,
    deleteStudentService,
} from '../services/studentService';

export async function findAllStudentController(request, response) {
    try {
        const result = await findAllStudentService();

        return response.status(result.status).json(result.data);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            return response.status(err.status).json({ message: err.message });
        }

        return response.status(500).json({ message: err.message });
    }
}

/*
    Aqui é o exemplo de como se usaria a função findAll que espera os parâmetros, para fazer
    paginação, ordenação e busca.
*/

// export async function findAllStudentController(request, response) {
//     try {
//         const { search, orderBy, direction, limit, offset } = request.query;

//         const result = await findAllStudentService({ search, orderBy, direction, limit, offset });

//         return response.status(result.status).json(result.data);
//     } catch (err) {
//         if (err.hasOwnProperty('hasError')) {
//             return response.status(err.status).json({ message: err.message });
//         }

//         return response.status(500).json({ message: err.message });
//     }
// }

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

export async function updateStudentController(request, response) {
    try {
        const { id } = request.params;
        const { name, email } = request.body;

        const result = await updateStudentService(id, { name, email });

        return response.status(result.status).json(result.data);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            return response.status(err.status).json({ message: err.message });
        }

        return response.status(500).json({ message: err.message });
    }
}

export async function deleteStudentController(request, response) {
    try {
        const { id } = request.params;

        const result = await deleteStudentService(id);

        return response.status(result.status).json(result.data);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            return response.status(err.status).json({ message: err.message });
        }

        return response.status(500).json({ message: err.message });
    }
}
