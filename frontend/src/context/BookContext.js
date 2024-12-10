import { createContext, useContext, useEffect, useState } from "react";
import { BOOKS_ENDPOINT } from "../config/constants";
import axiosInstance from "../api/axiosInstance";

const BookContext = createContext();

export const useBookContext = () => {
    return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    // load books that related to the logged user on page load
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axiosInstance.get(BOOKS_ENDPOINT);
            setBooks(response.data);
        } catch (error) {
            console.log("🚀 ~ fetchBooks ~ error:", error)
        }
    };

    const addBook = async (newBook) => {
        try {
            const response = await axiosInstance.post(BOOKS_ENDPOINT, newBook);
            setBooks((prevBooks) => [...prevBooks, response.data]);
        } catch (error) {
            console.log("🚀 ~ addBook ~ error:", error)
        }
    };

    const updateBook = async (id, updatedBook) => {
        try {
            const response = await axiosInstance.put(`${BOOKS_ENDPOINT}/${id}`, updatedBook);
            setBooks((prevBooks) => prevBooks?.map((book) => (book?._id === id ? response?.data : book)));
        } catch (error) {
            console.log("🚀 ~ updateBook ~ error:", error)
        }
    };

    const deleteBook = async (id) => {
        try {
            await axiosInstance.delete(`${BOOKS_ENDPOINT}/${id}`);
            setBooks((prevBooks) => prevBooks?.filter((book) => book?._id !== id));
        } catch (error) {
            console.log("🚀 ~ deleteBook ~ error:", error)
        }
    }

    return (
        <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
            {children}
        </BookContext.Provider>
    )
};