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
  </>
    )
}