import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Student from '../models/Student';

const connection = new Sequelize(databaseConfig);

Student.init(connection);

export default connection;
