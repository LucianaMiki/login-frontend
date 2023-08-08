import React from 'react'
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../assets/login.css";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
}
    from 'mdb-react-ui-kit';
import LoginForm from './LoginForm';
import LoginConfirm from './LoginConfirmed';
import ProtectedRoutes from "../ProtectedRoutes";
const cookies = new Cookies();

export default function LoginContainer() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [logged, setLogged] = useState(false);

    const confirmLoggeed = (data) => {
        setLogged(data);
    }

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
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-200'>

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>

                            {logged ? <ProtectedRoutes component={LoginConfirm}/> : <LoginForm logged={confirmLoggeed}/>}
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}
