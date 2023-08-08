import React from 'react'
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../assets/login.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';

const cookies = new Cookies();

export default function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "https://web-production-14dea.up.railway.app/login",
            data: {
                email,
                password,
            },
        };

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);

        axios(configuration)
            .then((result) => {
                setLogin(true);

                // set the cookie
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                props.logged(true);
            })
            .catch((error) => {
                setError(error.response.data.message);
                error = new Error();
            });
    }

    return (
        <>
            <p className="text-white-50 mb-5">Please enter your e-mail and password!</p>
            <Form noValidate validated={validated} className="mb-5 w-100" onSubmit={(e) => handleSubmit(e)}>
                {/* email */}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        An e-mail is required.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type={hidePassword ? "password" : "text"}
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <InputGroup.Text id="inputGroupPrepend">
                            <a
                                href="#"
                                className="toggle-btn"
                                onClick={() => {
                                    setHidePassword(!hidePassword);
                                }}
                            >
                                {hidePassword ? <FaEye /> : <FaEyeSlash />}
                            </a>
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            An password is required.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <br />
                <div className="login-button justify-content-center">
                    <button
                        className="button-login"
                        role="button"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Login
                    </button>
                </div>
            </Form>
            {<p className="text-danger">{error}</p>}
            <div>
                <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>

            </div>
        </>
    )
}
