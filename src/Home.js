import React from 'react'
import "./assets/home.css";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol
  }
  from 'mdb-react-ui-kit';

export default function Home() {
    return (
        <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
  
            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
  
                <h2 className="fw-bold mb-2 text-uppercase">Welcome</h2>
                <p className="text-white-50 mb-5">Login or register now!</p>
  
                <a className="home-button-login mb-4 w-100" href="/login">
                  <button className="button-login" role="button">Login</button>
                </a>

                <a className="home-button-register mb-4 w-100" href="/register">
                  <button className="button-register" role="button">Register</button>
                </a>
                
              </MDBCardBody>
            </MDBCard>
  
          </MDBCol>
        </MDBRow>
  
      </MDBContainer>
    )
}
