import { Request, Response } from 'express';
import User from '../models/User.model';

export const createUser = async (req: Request, res: Response) => {
    const { name, lastName, course, role } = req.body;
    try {
        const newUser = await User.create({ name, lastName, course, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}, // excluir algunos resultados
            order: [
                ['id', 'ASC']
            ]        
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: {exclude: ['createdAt', 'updatedAt']}, // excluir algunos resultados
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, lastName, course, role } = req.body;
    try {
        const [updated] = await User.update({ name, lastName, course, role }, {
            where: { id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await User.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
