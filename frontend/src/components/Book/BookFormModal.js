import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { MODEL_TITLES, MODEL_TYPES } from "../../config/constants";

const BookFormModal = ({ show, handleClose, handleSubmit, formData, setFormData, modalType }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{modalType === MODEL_TYPES.ADD ? MODEL_TITLES.ADD : modalType === MODEL_TYPES.EDIT ? MODEL_TITLES.EDIT : MODEL_TITLES.VIEW}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter book title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            disabled={modalType === MODEL_TYPES.VIEW}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author name"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            disabled={modalType === MODEL_TYPES.VIEW}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            disabled={modalType === MODEL_TYPES.VIEW}
                        />
                    </Form.Group>
                </Modal.Body>
                {modalType !== MODEL_TYPES.VIEW && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {modalType === MODEL_TYPES.ADD ? MODEL_TITLES.ADD : MODEL_TITLES.UPDATE}
                        </Button>
                    </Modal.Footer>
                )}
            </Form>
        </Modal>
    );
};

export default BookFormModal;