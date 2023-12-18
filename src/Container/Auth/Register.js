import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { errorNotify, successNotify } from '../../Utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { AuthRegister } from '../../Redux/Action/auth';
import cdaLogo from "../../images/cda_white_logo.png";
import './Auth.css';
import { encryptWithRSA } from '../../Components/Encryption/Encryption';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [designation, setDesignation] = useState('')
    const [contact, setContact] = useState('')
    const [cnic, setCnic] = useState('')
    const [access, setAccess] = useState('')
    const [address, setAddress] = useState('')
    const [secretKey, setSecretKey] = useState('')
    const userFound = JSON.parse(localStorage.getItem("user"))

    const { loading, getRegisterData, error } = useSelector((state) => state.registerData)

    useEffect(() => {
        if (userFound) {
            if (userFound?.access === 'admin') navigate('/dashboard/application')
            if (userFound?.access === 'masterAdmin') navigate('/dashboard')
            if (userFound?.access === 'user') navigate('/dashboard/registration')
        }
    }, [])

    useEffect(() => {
        if (getRegisterData?.response === 'Email Already Exist') {
            errorNotify(getRegisterData?.response)
            dispatch({ type: "REGISTER_RESET" })
        }
        else if (getRegisterData?.response && getRegisterData?.response !== 'Email Already Exist') {
            successNotify("Register Successfully!")
            dispatch({ type: "REGISTER_RESET" })
            navigate('/')
        }
        else if (error) {
            errorNotify(error)
            dispatch({ type: "REGISTER_RESET" })
        }
    }, [getRegisterData])

    const loginHandler = (e) => {
        e.preventDefault();
        if (name.length === 0 || email.length === 0 || password.length === 0 || designation.length === 0
            || contact.length === 0 || cnic.length === 0 || address.length === 0 || secretKey.length === 0 || access.length === 0) {
            errorNotify('fill out both fields')
            return
        }

        // if (access !== 'admin' || access !== 'user' || access !== 'masterAdmin') {
        //     errorNotify("Access must be only Admin, User, MasterAdmin")
        //     return
        // }

        const formData = new FormData();

        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("designation", designation)
        formData.append("access", 'user')
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
                            <img src={cdaLogo} alt='' />
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
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Access</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Access" value={access} onChange={(e) => setAccess(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Secret Key</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? <Spinner animation='border' size='sm' /> : 'Register'}
                                </Button>
                            </Form>

                            <h6>Already have an account? <a onClick={() => navigate('/')}> Login </a></h6>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register
