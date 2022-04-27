import { Button, Form, Modal } from "react-bootstrap";
import React from "react";
import { useState } from "react";


export const ImageUpload = ({sendMessage}) => {
    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageURL] = useState();
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleShowModal = () => {
        setShowModal(true);
    }
    const uploadImage = e => {
        setImageURL(URL.createObjectURL(e.target.files[0]));
      }
    const handleOnClick = () => {
        if (imageURL != null) {
            sendMessage(imageURL);
            setShowModal(false);
        }
    }
    return(
           <>
    <button className="btn btn-sm" onClick={handleShowModal}>
    <i className="bi bi-image"></i>
  </button>

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form > 
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              onChange={uploadImage}
              accept="image/*"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleOnClick}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  </>
    )
}