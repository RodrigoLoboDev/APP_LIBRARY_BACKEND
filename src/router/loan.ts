import { Router } from 'express';
import { createLoans, deleteLoan, getLoanById, getLoans, updateLoanStatus } from '../controllers/loan';
import { body, param } from 'express-validator';
import { getErrors } from '../middleware';

export const router = Router();

router.post('/', 
    body('userId').isInt().withMessage('ID de usuario no válido'),
    body('books').isArray({ min: 1 }).withMessage('Debe proporcionar al menos un libro'),
    body('books.*').isInt().withMessage('ID de libro no válido'),
    body('loanDate')
        .notEmpty().withMessage('La fecha de préstamo no puede ir vacía')
        .isDate().withMessage('Fecha no válida'),
    body('loanTime')
        .notEmpty().withMessage('La hora de préstamo no puede ir vacía')
        .isString().withMessage('Hora no válida'),
    body('returnDate').optional().isDate().withMessage('Fecha no válida'),
    body('returnTime').optional().isString().withMessage('Hora no válida'),
    getErrors,
    createLoans
);

router.get('/', getLoans);

router.get('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    getErrors,
    getLoanById
);

router.patch('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    getErrors,
    updateLoanStatus
);

router.delete('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    getErrors,
    deleteLoan
);
