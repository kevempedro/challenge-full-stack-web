import Student from '../models/Student';
import SuccessResponse from '../shared/response/successResponse';
import ErrorResponse from '../shared/response/errorResponse';
import validateEmail from '../shared/utils/validateEmail';
import MESSAGES from '../shared/utils/messages';
import HTTP_STATUS from '../shared/utils/httStatus';
import HTT_STATUS from '../shared/utils/httStatus';
import { Op } from 'sequelize';

export async function findAllStudentService() {
    try {
        const students = await Student.findAll();

        return new SuccessResponse({ data: students }, HTT_STATUS.OK);
    } catch (err) {
        throw new ErrorResponse(err.message, HTT_STATUS.INTERNAL_SERVER_ERROR);
    }
}

// export async function findAllStudentService(query) {
//     try {
//         const students = await Student.findAll({
//             where: {
//                 name: { [Op.like]: `%${query.search}%` }
//             },
//             order: [[`${query.orderBy}`, `${query.direction}`]],
//             limit: query.limit,
//             offset: query.offset,
//         });

//         return new SuccessResponse({ data: students }, HTT_STATUS.OK);
//     } catch (err) {
//         throw new ErrorResponse(err.message, HTT_STATUS.INTERNAL_SERVER_ERROR);
//     }
// }

export async function createStudentService(body) {
    try {
        if (!validateEmail(body.email)) {
            throw new ErrorResponse(MESSAGES.INVALID_EMAIL, HTTP_STATUS.BAD_GATEWAY);
        }

        const student = await Student.findOne({ where: { academicRecord: body.academicRecord } });

        if (student) {
            throw new ErrorResponse(MESSAGES.ACADEMIC_RECORD_ALREADY_EXISTS, HTT_STATUS.FOUND);
        }

        await Student.create(body);

        return new SuccessResponse({ data: MESSAGES.CREATED }, HTT_STATUS.CREATED);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            throw new ErrorResponse(err.message, err.status);
        }

        throw new ErrorResponse(err.message, HTT_STATUS.INTERNAL_SERVER_ERROR);
    }
}

export async function updateStudentService(id, body) {
    try {
        if (!validateEmail(body.email)) {
            throw new ErrorResponse(MESSAGES.INVALID_EMAIL, HTTP_STATUS.BAD_GATEWAY);
        }

        const student = await Student.findOne({ where: { id } });

        if (!student) {
            throw new ErrorResponse(MESSAGES.STUDENT_NOT_FOUND, HTT_STATUS.NOT_FOUND);
        }

        await Student.update({ name: body.name, email: body.email }, { where: { id } });

        return new SuccessResponse({ data: MESSAGES.UPDATED }, HTT_STATUS.OK);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            throw new ErrorResponse(err.message, err.status);
        }

        throw new ErrorResponse(err.message, HTT_STATUS.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteStudentService(id) {
    try {
        const student = await Student.findOne({ where: { id } });

        if (!student) {
            throw new ErrorResponse(MESSAGES.STUDENT_NOT_FOUND, HTT_STATUS.NOT_FOUND);
        }

        await Student.destroy({ where: { id } });

        return new SuccessResponse({ data: MESSAGES.DELETED }, HTT_STATUS.OK);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            throw new ErrorResponse(err.message, err.status);
        }

        throw new ErrorResponse(err.message, HTT_STATUS.INTERNAL_SERVER_ERROR);
    }
}
