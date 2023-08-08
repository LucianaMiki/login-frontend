import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "../assets/register.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';

export default function RegisterForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState("");
    const [error, setError] = useState("");

    const [hidePassword, setHidePassword] = useState(true);

    const handlePassword = (passwordValue) => {
        const strengthChecks = {
            length: 0,
            hasUpperCase: false,
            hasLowerCase: false,
            hasDigit: false,
            hasSpecialChar: false,
        };

        strengthChecks.length = passwordValue.length >= 8 ? true : false;
        strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
        strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
        strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
        strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

        let verifiedList = Object.values(strengthChecks).filter((value) => value);

        let strength =
            verifiedList.length == 5
                ? "Strong"
                : verifiedList.length >= 2
                    ? "Medium"
                    : "Weak";

        setPassword(passwordValue);
        setProgress(`${(verifiedList.length / 5) * 100}%`);
        setMessage(strength);
    };

    const getActiveColor = (type) => {
        if (type === "Strong") return "#8BC926";
        if (type === "Medium") return "#FEBD01";
        return "#FF0054";
    };

    const handleSubmit = (e) => {
        const configuration = {
            method: "post",
            url: "https://web-production-14dea.up.railway.app/register",
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
        // make the API call
        axios(configuration)
            .then((result) => {
                console.log(result)
                setRegister(true);
                props.registered(true);
            })
            .catch((error) => {
                if(error.response.status === 500){
                    setError(error.response.data.message);
                }
                error = new Error();
            });
        // prevent the form from refreshing the whole page
        e.preventDefault();
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
                            onChange={(e) => handlePassword(e.target.value)}
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
                    <div className="progress-bg">
                        <div
                            className="progress"
                            style={{
                                width: progress,
                                backgroundColor: getActiveColor(message),
                                height: '8px'
                            }}
                        ></div>
                    </div>
                    {password.length !== 0 ? (
                        <p className="message" style={{ color: getActiveColor(message) }}>
                            Your password is {message}
                        </p>
                    ) : null}
                </Form.Group>
                <br />
                <div className="login-button justify-content-center">
                    <Button
                        className="button-login"
                        role="button"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Register
                    </Button>
                </div>
            </Form>
            {<p className="text-danger">{error}</p>}
            <div>
                <p className="mb-0">Already have an account? <a href="/login" className="text-white-50 fw-bold">Sign In</a></p>

            </div>
        </>
    )
}
