import React from 'react';
import './Auth.css'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const loginHandler = () => {
        navigate('/user/form')
    }

    return (
        <div className='main_login'>
            <Container>
                <Row className='align-items-center justify-content-center'>
                    <Col md={7}>
                        <img src='/images/cdc_logo.png' alt='' />
                        <h1><span>Welcome To</span> <br />
                            Capital Development Authority <br /> <span>Islamabad</span>
                        </h1>
                    </Col>
                    <Col md={5}>
                        <div className='login_form'>
                            <h3>Login</h3>

                            <Form onSubmit={loginHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" />
                                </Form.Group>
                                <p>Forgot Password?</p>
                                <Button variant="primary" type="submit">
                                    LOGIN
                                </Button>
                            </Form>

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
