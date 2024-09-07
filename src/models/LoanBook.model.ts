import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import Loan from "./Loan.model"; // Importar el modelo de Loan
import Book from "./Books.model"; // Importar el modelo de Book

@Table({
    tableName: 'loan_books',
    timestamps: false // Opcional: desactivar timestamps si no se requieren
})
class LoanBook extends Model {
    @ForeignKey(() => Loan)
    @Column({
        type: DataType.INTEGER
    })
    declare loanId: number;

    @ForeignKey(() => Book)
    @Column({
        type: DataType.INTEGER
    })
    declare bookId: number;
}

export default LoanBook;
