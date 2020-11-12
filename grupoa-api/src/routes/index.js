import express from 'express';

import {
    createStudentController,
    updateStudentController,
    deleteStudentController,
} from '../controllers/studentController';

const routes = express.Router();

routes.post('/student', createStudentController);
routes.put('/student/:id', updateStudentController);
routes.delete('/student/:id', deleteStudentController);

export default routes;
