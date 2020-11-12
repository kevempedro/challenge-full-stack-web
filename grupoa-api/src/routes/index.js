import express from 'express';

import {
    createStudentController,
    updateStudentController,
} from '../controllers/studentController';

const routes = express.Router();

routes.post('/student', createStudentController);
routes.put('/student/:id', updateStudentController);

export default routes;
