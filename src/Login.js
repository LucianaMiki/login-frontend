import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://web-production-14dea.up.railway.app/login",
            data: {
              email,
              password,
            },
        };

        axios(configuration)
        .then((result) => {
            setLogin(true);

            // set the cookie
            cookies.set("TOKEN", result.data.token, {
                path: "/",
            });
            // redirect user to the auth page
            window.location.href = "/auth";
        })
        .catch((error) => {
            error = new Error();
        });

    }
    return (
        <>
            <h2>Login</h2>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    {/* email */}
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Form.Group>

                    {/* password */}
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Login
                    </Button>
                </Form>
                {login ? (
                <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                <p className="text-danger">You Are Not Logged in</p>
                )}
        </>
    )
}
