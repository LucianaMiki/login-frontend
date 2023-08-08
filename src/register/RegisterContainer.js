import React from 'react'
import { useState } from "react";
import "../assets/register.css";
import RegisterForm from './RegisterForm';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
}from 'mdb-react-ui-kit';
import RegisterConfirm from './ReigsterConfirm';

export default function RegisterContainer() {
    const [registered, setRegistered] = useState(false);

    const confirmRegistered = (data) => {
        setRegistered(data);
    }

    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-200'>

                            <h2 className="fw-bold mb-2 text-uppercase">Register</h2>

                            {registered ? <RegisterConfirm/> : <RegisterForm registered={confirmRegistered}/>}
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}
