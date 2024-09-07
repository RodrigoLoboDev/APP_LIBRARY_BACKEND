import { Request, Response } from 'express';
import Book from '../models/Books.model';


export const createBook = async (req: Request, res: Response) => {
    const { title, author, publicationDate, quantity } = req.body;
    try {
        const newBook = await Book.create({ title, author, publicationDate, quantity });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}, // excluir algunos resultados
            order: [
                ['id', 'ASC']
            ]        
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id, {
            attributes: {exclude: ['createdAt', 'updatedAt']}, // excluir algunos resultados
        });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, publicationDate, quantity } = req.body;
    try {
        const [updated] = await Book.update({ title, author, publicationDate, quantity }, {
            where: { id }
        });
        if (updated) {
            const updatedBook = await Book.findByPk(id);
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await Book.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
