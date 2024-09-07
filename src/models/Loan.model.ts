import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import Book from './Books.model';
import LoanBook from './LoanBook.model';
import User from './User.model';

@Table({
    tableName: 'loans'
})
class Loan extends Model {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare userId: number;

    @Column({
        type: DataType.DATEONLY
    })
    declare loanDate: Date;

    @Column({
        type: DataType.DATEONLY
    })
    declare returnDate: Date;

    @Column({
        type: DataType.TIME
    })
    declare loanTime: string;

    @Column({
        type: DataType.TIME
    })
    declare returnTime: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare isActive: boolean;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => Book, () => LoanBook)
    books: Book[];
}

export default Loan;
