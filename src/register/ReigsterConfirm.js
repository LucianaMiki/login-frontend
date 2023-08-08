import React from 'react'
import "../assets/register.css";

export default function RegisterConfirm() {
    return (
        <>
            <h2 className="register-confirm-text">Registered succesfully!</h2>

            <a className="home-button-register mb-4 w-100" href="/">
                <button className="button-register" role="button">Home screen</button>
            </a>
        </>
    )
}
