import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user';
import { body, param } from 'express-validator';
import { getErrors } from '../middleware';

export const router = Router();

router.post('/', 
    body('name').notEmpty().withMessage('El nombre del usuario no puede ir vacío'),
    body('lastName').notEmpty().withMessage('El apellido del usuario no puede ir vacío'),
    body('course').notEmpty().withMessage('El curso del usuario no puede ir vacío'),
    body('role').notEmpty().withMessage('El rol del usuario no puede ir vacío'),
    getErrors,
    createUser
);

router.get('/', getUsers);

router.get('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    getErrors,
    getUserById
);

router.put('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre del usuario no puede ir vacío'),
    body('lastName').notEmpty().withMessage('El apellido del usuario no puede ir vacío'),
    body('course').notEmpty().withMessage('El curso del usuario no puede ir vacío'),
    body('role').notEmpty().withMessage('El rol del usuario no puede ir vacío'),
    getErrors,
    updateUser
);

router.delete('/:id', 
    param('id').isNumeric().withMessage('ID no válido'),
    getErrors,
    deleteUser
);
