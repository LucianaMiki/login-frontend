import { Container, Col, Row } from "react-bootstrap";
import { Routes ,Route } from 'react-router-dom';
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./Home";
import "./assets/App.css";
import { FaDiceD6 } from 'react-icons/fa6';
import LoginContainer from "./login/LoginContainer";
import RegisterContainer from "./register/RegisterContainer";

function App() {
  return (
    <Container fluid>
      <Row className="text-center">
      <a className="navigation-text" href="/">
        <Col md={4}>
          <FaDiceD6 className="logo-icon"/> Logo
        </Col>
        </a>
      </Row>

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/free" element={<FreeComponent/>} />
        <Route path="/auth" element={<ProtectedRoutes component={AuthComponent}/>}/>
        <Route exact path="/register" element={<RegisterContainer/>} />
        <Route path="/login" element={<LoginContainer/>}/>
      </Routes>
    </Container>
  );
}

export default App;

