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
            <button className='btn btn-sm'>
                <i class="bi bi-camera-video-fill"/>
            </button>
        </>
    )
}
