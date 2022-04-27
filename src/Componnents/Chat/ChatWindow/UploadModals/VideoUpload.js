import React , { useState } from 'react'
import { Modal, Form, Button, FormGroup } from 'react-bootstrap'

export const VideoUpload = ({sendMessage}) => {
    const [showModal, setShowModal] = useState(false);
    const [videoURL, setVideoURL] = useState();
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleShowModal = () => {
        setShowModal(true);
    }

    const uploadVideo = (event) => {
        setVideoURL(URL.createObjectURL(event.target.files[0]));
    }
    const handleOnClick = () => {
        if (videoURL != null) {
            sendMessage(videoURL);
            setShowModal(false);
        }
    }
    return(
        <>
            <button className='btn btn-sm' onClick={handleShowModal}>
                <i class="bi bi-camera-video-fill"/>
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a video to upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup className="mb-3">
                            <Form.Control 
                                type='file'
                                onChange={uploadVideo}
                                accept="video/*"
                            ></Form.Control>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleOnClick}>Send</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
