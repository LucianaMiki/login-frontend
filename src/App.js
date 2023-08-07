import { Container, Col, Row } from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";
import { Routes ,Route } from 'react-router-dom';
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>React Authentication Tutorial</h1>

          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">Free Component</a>
            <a href="/auth">Auth Component</a>
          </section>
        </Col>
      </Row>

      <Routes>
        <Route exact path="/" element={<Account/>} />
        <Route exact path="/free" element={<FreeComponent/>} />
        <Route path="/auth" element={<ProtectedRoutes component={AuthComponent}/>}/>
      </Routes>
    </Container>
  );
}

export default App;

