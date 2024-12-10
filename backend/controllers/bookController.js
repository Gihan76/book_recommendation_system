import Book from '../models/Book.js';

// get all books for authenticated user
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({ user: req.userId });
        res.status(200).json(books);
    } catch (error) {
        console.log("🚀 ~ getBooks ~ error:", error)
        res.status(500).json({ message: 'Server error' });
    }
};

// get book by id
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || book.user.toString() !== req.userId) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log("🚀 ~ getBookById ~ error:", error)
        res.status(500).json({ message: 'Server error' });
    }
};

// add book
export const createBook = async (req, res) => {
    const { title, author, description } = req.body;
    try {
        const newBook = new Book({
            title,
            author,
            description,
            user: req.userId,
        });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.log("🚀 ~ createBook ~ error:", error)
        res.status(500).json({ message: 'Server error' });
    }
};

// update book by id
export const updateBook = async (req, res) => {
    const { title, author, description } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book || book.user.toString() !== req.userId) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description;

        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (error) {
        console.log("🚀 ~ updateBook ~ error:", error)
        res.status(500).json({ message: 'Failed to update book' });
    }
};

// delete book by id
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || book.user.toString() !== req.userId) {
            return res.status(404).json({ message: 'Book not found' });
        }
        await book.deleteOne();
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        console.log("🚀 ~ deleteBook ~ error:", error)
        res.status(500).json({ message: 'Failed to delete book' });
    }
};