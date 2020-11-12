import express from 'express';

import { createStudentController } from '../controllers/studentController';

const routes = express.Router();

routes.post('/student', createStudentController);

export default routes;
