import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
function Register() {
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showerr, setShowErr] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowErr = () => setShowErr(true);
    const handleCloseErr = () => setShowErr(false);
    let callapi = async () => {
        const returnObject = { 'id': id, 'email': email, 'day': date.toString() }
        fetch(`http://127.0.0.1:8000/api/register/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(returnObject)
        }).then(jsonResponse => {
            if (jsonResponse.status == 200) {
                handleShow();
            } else {
                handleShowErr();
            }
        }).catch(error => {
            handleShowErr();
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        callapi();
    }
    return (
        <div className="register-main">
        <Card style={{ width: '24rem' }} className='register-card'>
            <Card.Title>Register Form</Card.Title>
            <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="registerdate" >
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="registerdate"
                        placeholder="Register date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll send you an email notification when there are opening slots before your selected date.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>Success</Modal.Header>
                <Modal.Body>Successfuly registered! We have send you an email, please remember to check your spam folder if you don't recieve it.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showerr} onHide={handleCloseErr} centered>
                <Modal.Header>Oops!</Modal.Header>
                <Modal.Body>Something went wrong with the server, please contact njmvctracker@gmail.com.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseErr}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </Card.Body>
        </Card>
        </div>
    );
}

export default Register;