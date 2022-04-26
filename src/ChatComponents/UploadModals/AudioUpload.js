import React, { useState } from 'react';
import { Modal , Button } from 'react-bootstrap'
import { RecordingDiplay } from './RecordingDisplay';


export const AudioUpload = ({sendMessage}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); setRecord("") }
    const handleShow = () => setShow(true);
    const [record, setRecord] = useState("");

    const handleSendRecord = ((e) => {
            sendMessage(record);
            handleClose();
    })


    const recordAudio = () =>
        new Promise(async resolve => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", e => {
                audioChunks.push(e.data);
            });

            const start = () => mediaRecorder.start();

            const stop = () =>
                new Promise(resolve => {
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        resolve({ audioBlob, audioUrl });
                    });

                    mediaRecorder.stop();
                });

            resolve({ start, stop });
        });

    let recHolder = []
    const handleStart = ((e) => {
        startRecording()
    })

    const handleStop = ((e) => {
        stopRecording(recHolder[0])
    });

    async function startRecording() {
        const recorder = await recordAudio();
        recHolder[0] = recorder
        recorder.start();
    }

    async function stopRecording(recorder) {
        const audio = await recorder.stop();
        setRecord(audio.audioUrl);
    }


    return (
        <>
            <button className="btn btn-sm" onClick={handleShow}>
                <i className="bi bi-mic" />
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Press and Hold to record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <button className="btn btn-sm" onMouseDown={handleStart} onMouseUp={handleStop}>
                        <i className="bi bi-mic"></i>
                    </button>
                    {(record !== "") ? <RecordingDiplay record={record} /> : ""}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSendRecord}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}