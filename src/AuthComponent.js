import React, { useEffect, useState,  } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
const cookies = new Cookies();


export default function AuthComponent() {
  const [message, setMessage] = useState("");
  const token = cookies.get("TOKEN");

  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://web-production-14dea.up.railway.app/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, [])

    // logout
    const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
    }
  return (
    <div className="text-center">
      <h1 className="text-center">Auth Component</h1>
      <h3 className="text-center text-danger">{message}</h3>
      {/* logout */}
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
