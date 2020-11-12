import Student from '../models/Student';
import SuccessResponse from '../shared/response/successResponse';
import ErrorResponse from '../shared/response/errorResponse';
import validateEmail from '../shared/utils/validateEmail';
import MESSAGES from '../shared/utils/messages';

export async function createStudentService(body) {
    try {
        if (!validateEmail(body.email)) {
            throw new ErrorResponse(MESSAGES.INVALID_EMAIL, 502);
        }

        const student = await Student.findAll({ where: { academicRecord: body.academicRecord } });

        if (student) {
            throw new ErrorResponse(MESSAGES.ACADEMIC_RECORD_ALREADY_EXISTS, 302);
        }

        await Student.create(body);

        return new SuccessResponse({ data: MESSAGES.CREATED }, 201);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            throw new ErrorResponse(err.message, err.status);
        }

        throw new ErrorResponse(err.message, 500);
    }
}

export async function updatetudentService(id, body) {
    try {
        if (!validateEmail(body.email)) {
            throw new ErrorResponse(MESSAGES.INVALID_EMAIL, 502);
        }

        const student = await Student.findOne({ where: { id } });

        if (!student) {
            throw new ErrorResponse(MESSAGES.STUDENT_NOT_FOUND, 404);
        }

        await Student.update({ name: body.name, email: body.email }, { where: { id } });

        return new SuccessResponse({ data: MESSAGES.UPDATED }, 200);
    } catch (err) {
        if (err.hasOwnProperty('hasError')) {
            throw new ErrorResponse(err.message, err.status);
        }

        throw new ErrorResponse(err.message, 500);
    }
}
