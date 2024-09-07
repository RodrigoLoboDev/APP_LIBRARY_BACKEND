import { Router } from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controllers/book';
import { body, param } from 'express-validator';
import { getErrors } from '../middleware';

export const router = Router();

router.post('/', 
    body('title').notEmpty().withMessage('El título del libro no puede ir vacío'),
    body('author').notEmpty().withMessage('El autor del libro no puede ir vacío'),
    body('publicationDate')
        .notEmpty().withMessage('La fecha de publicación del libro no puede ir vacía')
        .isDate().withMessage('Fecha no válida'),
    body('quantity')
        .isInt({ gt: 0 }).withMessage('La cantidad debe ser un número entero positivo')
        .notEmpty().withMessage('La cantidad del libro no puede ir vacía'),
    getErrors, // middleware
    createBook
);

router.get('/', getBooks);

router.get('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    getErrors,
    getBookById
);

router.put('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    body('title').notEmpty().withMessage('El título del libro no puede ir vacío'),
    body('author').notEmpty().withMessage('El autor del libro no puede ir vacío'),
    body('publicationDate')
        .notEmpty().withMessage('La fecha de publicación del libro no puede ir vacía')
        .isDate().withMessage('Fecha no válida'),
    body('quantity')
        .isInt({ gt: 0 }).withMessage('La cantidad debe ser un número entero positivo')
        .notEmpty().withMessage('La cantidad del libro no puede ir vacía'),
    getErrors,
    updateBook
);

router.delete('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    getErrors,
    deleteBook
);
