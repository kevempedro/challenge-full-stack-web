import { Model, DataTypes } from 'sequelize';

export default class Student extends Model {
    static init(connection) {
        super.init({
            academicRecord: DataTypes.INTEGER,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            cpf: DataTypes.STRING,
        }, {
            sequelize: connection
        });
    }
}
