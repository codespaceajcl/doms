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
import { AuthLogin } from '../../Redux/Action/auth';
import mainLogo from "../../images/cdc_logo.png"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userFound = JSON.parse(localStorage.getItem("user"))

    const { loading, getLoginData, error } = useSelector((state) => state.loginData)

    useEffect(() => {
        if (userFound) {
            navigate('/dashboard')
        }
    }, [])

    useEffect(() => {
        if (getLoginData) {
            successNotify("Login Successfully!")
            dispatch({ type: "LOGIN_RESET" })
            navigate('/dashboard')
        }
        else if (error) {
            errorNotify(error)
            dispatch({ type: "LOGIN_RESET" })
        }
    }, [getLoginData])

    const loginHandler = (e) => {
        e.preventDefault();
        if (email.length === 0 || password.length === 0) {
            errorNotify('fill out both fields')
            return
        }

        const formData = new FormData();
        formData.append("email", email)
        formData.append("password", password)

        dispatch(AuthLogin(formData))

    }

    return (
        <div className='main_login'>
            <Container>
                <Row className='align-items-center justify-content-center'>
                    <Col md={7}>
                        <div className='left_form'>
                            <img src={mainLogo} alt='' />
                            <h1><span>Welcome To</span> <br />
                                Capital Development Authority <br /> <span>Islamabad</span>
                            </h1>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className='login_form'>
                            <h3>Login</h3>

                            <Form onSubmit={loginHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                {/* <p>Forgot Password?</p> */}
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? <Spinner animation='border' size='sm' /> : 'LOGIN'}
                                </Button>
                            </Form>

                            <h6>Don't have an account? <a onClick={() => navigate('/register')}> Register </a></h6>

                            <h6>Need guidance? <a href='https://www.cda.gov.pk/eservices/askcda.asp' target='_blank'>
                                ask CDA</a></h6>

                            <div className='social_icons'>
                                <a href='https://www.cda.gov.pk/' target='_blank'> <TbWorld /> </a>
                                <a href='mailto:getreply@cda.gov.pk'><MdEmail /></a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
