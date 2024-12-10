import React from "react";
import { Button, Table } from 'react-bootstrap';

const BookTable = ({ books, onView, onEdit, onDelete }) => {
    return (
        <Table bordered hover responsive>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books?.map((book) => (
                    <tr key={book?._id}>
                        <td>{book?.title}</td>
                        <td>{book?.author}</td>
                        <td>{book?.description || "N/A"}</td>
                        <td>
                            <Button variant="info" className="me-2" onClick={() => onView(book)}>
                                <i className="fa fa-eye" aria-hidden="true"></i> View
                            </Button>
                            <Button variant="warning" className="me-2" onClick={() => onEdit(book)}>
                                <i className="fa fa-pen" aria-hidden="true"></i> Edit
                            </Button>
                            <Button variant="danger" className="me-2" onClick={() => onDelete(book)}>
                                <i className="fa fa-trash" aria-hidden="true"></i> Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default BookTable;