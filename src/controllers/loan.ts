import { Request, Response } from 'express';
import Loan from '../models/Loan.model';
import Book from '../models/Books.model';
import User from '../models/User.model';
import LoanBook from '../models/LoanBook.model';


export const createLoans = async (req: Request, res: Response) => {
    const { userId, books, loanDate, loanTime, returnDate, returnTime } = req.body;
    try {
        const newLoan = await Loan.create({
            userId,
            loanDate,
            loanTime,
            returnDate,
            returnTime
        });

        // Asociar los libros con el préstamo
        const booksToAdd = await Book.findAll({
            where: {
                id: books
            }
        });

        await newLoan.$set('books', booksToAdd);

        // Obtener el préstamo completo con los libros asociados
        const fullLoan = await Loan.findByPk(newLoan.id, {
            include: [
                { model: User },
                { model: Book }
            ]
        });

        res.status(201).json(fullLoan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getLoans = async (req: Request, res: Response) => {
    try {
        const loans = await Loan.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}, // excluir algunos resultados
            include: [
                {
                    model: User,
                    attributes: ['name', 'lastName', 'course', 'role']
                },
                {
                    model: Book,
                    attributes: ['title', 'author', 'publicationDate']
                }
            ],
            order: [
                ['isActive', 'DESC']
            ]
        });
        res.status(200).json(loans);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getLoanById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const loan = await Loan.findByPk(id, {
            attributes: {exclude: ['createdAt', 'updatedAt']}, // excluir algunos resultados
            include: [
                {
                    model: User,
                    attributes: ['name', 'lastName', 'course', 'role']
                },
                {
                    model: Book,
                    attributes: ['title', 'author', 'publicationDate']
                }
            ]
        });
        if (loan) {
            res.status(200).json(loan);
        } else {
            res.status(404).json({ message: 'Préstamo no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateLoanStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        // console.log(id);
        const loan = await Loan.findByPk(id)

        if (!loan) {
            return res.status(404).json({error: 'Prestamo No Encontrado'})
        }

        // Verificar si el préstamo ya está devuelto
        if (!loan.isActive && loan.returnDate !== null) {
            return res.status(400).json({ error: 'Este préstamo ya ha sido devuelto y no puede ser modificado' });
        }

        // Actualizar
        loan.isActive = !loan.isActive // con esto me evito pasar algo en el body

        // Si el préstamo está marcado como inactivo (devolución), actualizar fecha y hora de retorno
        if (!loan.isActive) {
            const currentDate = new Date();
            loan.returnDate = currentDate;
            loan.returnTime = currentDate.toLocaleTimeString();
        }

        await loan.save()

        res.json({data: loan})
    } catch (error) {
        console.log(error);
    }
};

export const deleteLoan = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Buscar el préstamo
        const loan = await Loan.findByPk(id);
        if (!loan) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }

        // Eliminar las referencias en la tabla LoanBook
        await LoanBook.destroy({
            where: { loanId: id }
        });

        // Eliminar el préstamo
        await Loan.destroy({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
