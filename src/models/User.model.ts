import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Loan from "./Loan.model";

@Table({
    tableName: 'users'
})
class User extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare lastName: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare course: string;

    @Column({
        type: DataType.ENUM('Alumno', 'Docente')
    })
    declare role: string;

    @HasMany(() => Loan)
    loans: Loan[];
}

export default User;