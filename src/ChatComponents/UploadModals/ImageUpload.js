import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import React from "react";
import { useState } from "react";


export const ImageUpload = ({sendMessage}) => {
    
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleShowModal = () => {
        setShowModal(true);
    }
    const [imageURL, setImageURL] = useState();

    const uploadImage = event => {
        setImageURL(URL.createObjectURL(event.target.files[0]));
        console.log(imageURL);
    }
    const handleClickOnSend = () => {
        if (imageURL != null) {
            sendMessage(imageURL);
            setShowModal(false);
        }
    }
    return(
        <>
            <button className="btn btn-sm" onClick={handleShowModal}>
                <i className="bi bi-camera-fill"/> 
            </button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose an Image to Upload</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control 
                                type="file"
                                onClick={uploadImage}
                                accept="image/*"
                            />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClickOnSend}>Send</Button>
                </Modal.Footer>
            </Modal> 
        </>
    )
}