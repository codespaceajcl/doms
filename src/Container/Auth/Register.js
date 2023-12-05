import React, { useEffect, useState } from 'react';
import './Auth.css'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { errorNotify, successNotify } from '../../Utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { AuthRegister } from '../../Redux/Action/auth';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [designation, setDesignation] = useState('')
    const [contact, setContact] = useState('')
    const [cnic, setCnic] = useState('')
    const [address, setAddress] = useState('')
    const userFound = JSON.parse(localStorage.getItem("user"))

    const { loading, getRegisterData, error } = useSelector((state) => state.registerData)

    useEffect(() => {
        if (userFound) {
            navigate('/dashboard')
        }
    }, [])

    useEffect(() => {
        if (getRegisterData) {
            successNotify("Register Successfully!")
            dispatch({ type: "REGISTER_RESET" })
            navigate('/')
        }
        else if (error) {
            errorNotify(error)
            dispatch({ type: "REGISTER_RESET" })
        }
    }, [getRegisterData])

    const generateRandomKey = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomKey = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomKey += characters.charAt(randomIndex);
        }
        return randomKey;
    };

    const loginHandler = (e) => {
        e.preventDefault();
        if (name.length === 0 || email.length === 0 || password.length === 0 || designation.length === 0
            || contact.length === 0 || cnic.length === 0 || address.length === 0) {
            errorNotify('fill out both fields')
            return
        }

        const secretKey = generateRandomKey(32);

        const formData = new FormData();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("designation", designation)
        formData.append("access", 'admin')
        formData.append("contact", contact)
        formData.append("cnic", cnic)
        formData.append("address", address)
        formData.append("secretKey", secretKey)

        dispatch(AuthRegister(formData))

    }

    return (
        <div className='main_login'>
            <Container>
                <Row className='align-items-center justify-content-center'>
                    <Col md={6}>
                        <div className='left_form'>
                            <img src='/images/cdc_logo.png' alt='' />
                            <h1><span>Welcome To</span> <br />
                                Capital Development Authority <br /> <span>Islamabad</span>
                            </h1>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='login_form register_form'>
                            <h3>Register</h3>

                            <Form onSubmit={loginHandler}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Designation</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Contact</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>CNIC</Form.Label>
                                            <Form.Control type="text" placeholder="Enter CNIC" value={cnic} onChange={(e) => setCnic(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button variant="primary" type="submit">
                                    {loading ? <Spinner animation='border' size='sm' /> : 'Register'}
                                </Button>
                            </Form>

                            <h6>Already have an account? <a onClick={() => navigate('/')}> Login </a></h6>

                            {/* <h6>Need guidance? <a href='https://www.cda.gov.pk/eservices/askcda.asp' target='_blank'>
                                ask CDA</a></h6>

                            <div className='social_icons'>
                                <a href='https://www.cda.gov.pk/' target='_blank'> <TbWorld /> </a>
                                <a href='mailto:getreply@cda.gov.pk'><MdEmail /></a>
                            </div> */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register
