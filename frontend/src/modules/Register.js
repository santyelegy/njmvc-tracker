import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function Register() {
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    let callapi = async () => {
        const returnObject={'id':id,'email':email,'day':date.toString()}
        fetch(`http://127.0.0.1:8000/api/register/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(returnObject)
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
        }).catch(error => {
            console.log(error)
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        callapi();
    }
    return (
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
    );
}

export default Register;