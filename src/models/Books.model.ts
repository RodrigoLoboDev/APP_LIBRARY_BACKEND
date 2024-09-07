// importamos los decoradores - usamos cada decorador con un @
import { Table, Column, Model, DataType, BelongsToMany } from "sequelize-typescript"
import Loan from "./Loan.model"
import LoanBook from "./LoanBook.model"

@Table({
    tableName: 'books'
})

class Book extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare title: string

    @Column({
        type: DataType.STRING(100)
    })
    declare author: string

    @Column({
        type: DataType.DATEONLY
    })
    declare publicationDate: Date

    @Column({
        type: DataType.INTEGER,
        defaultValue: 1
    })
    declare quantity: number;

    @BelongsToMany(() => Loan, () => LoanBook)
    loans: Loan[];
}

export default Book