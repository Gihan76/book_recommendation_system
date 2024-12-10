import React, { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { useBookContext } from "../context/BookContext";
import BookFormModal from "../components/Book/BookFormModal";
import ConfirmDeleteModal from "../components/Book/ConfirmDeleteModal";
import BookTable from "../components/Book/BookTable";
import { MODEL_TYPES } from "../config/constants";

export const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);
    const { books, addBook, updateBook, deleteBook } = useBookContext();
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalType, setModalType] = useState(MODEL_TYPES.ADD);
    const [selectedBook, setSelectedBook] = useState(null);
    const [formData, setFormData] = useState({ title: "", author: "", description: "" });

    const handleOpenFormModal = (type, book = null) => {
        setModalType(type);
        setSelectedBook(book);
        if (book) {
            setFormData({ title: book.title, author: book.author, description: book.description || "" });
        } else {
            setFormData({ title: "", author: "", description: "" });
        }
        setShowFormModal(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (modalType === MODEL_TYPES.ADD) addBook(formData);
        else if (modalType === MODEL_TYPES.EDIT) updateBook(selectedBook._id, formData);
        setShowFormModal(false);
    };

    const handleDeleteConfirm = () => {
        deleteBook(selectedBook._id);
        setShowDeleteModal(false);
    };

    return (
        <div>
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center py-3" style={{ backgroundColor: "#ccffff" }}>
                <h1 className="h4" style={{ marginLeft: "20px" }}>Book Recommendation System <i className="fas fa-book"></i></h1>
                <div className="dropdown" style={{ marginRight: "20px" }}>
                    {/* user avatar */}
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/avatar.png`}
                        alt="User Avatar"
                        className="rounded-circle"
                        style={{ cursor: 'pointer', width: "40px", height: "40px", border: '1px solid' }}
                        id="avatarDropdown"
                        data-bs-toggle="dropdown"
                        data-tooltip-id="email-tooltip"
                    />
                    {/* email tooltip when hover on user avatar */}
                    <ReactTooltip
                        id="email-tooltip"
                        content={user?.email}
                    />
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="avatarDropdown">
                        <li>
                            <button className="dropdown-item" onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Your Books</h2>
                    <button className="btn btn-primary" onClick={() => handleOpenFormModal(MODEL_TYPES.ADD)}>
                        Add Book
                    </button>
                </div>
                <BookTable
                    books={books}
                    onView={(book) => handleOpenFormModal(MODEL_TYPES.VIEW, book)}
                    onEdit={(book) => handleOpenFormModal(MODEL_TYPES.EDIT, book)}
                    onDelete={(book) => setSelectedBook(book) || setShowDeleteModal(true)}
                />
            </main>

            {/* Modals */}
            <BookFormModal
                show={showFormModal}
                handleClose={() => setShowFormModal(false)}
                handleSubmit={handleFormSubmit}
                formData={formData}
                setFormData={setFormData}
                modalType={modalType}
            />
            <ConfirmDeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={handleDeleteConfirm}
            />
        </div>
    )
}