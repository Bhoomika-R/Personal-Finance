import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeSwitcher } from '../components/ThemeSwitcher'
export function Login() {
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await login(
      formData.get('email'),
      formData.get('password')
    );
  };

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="w-100 h-100 min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar expand="lg" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand className="fw-bold">Finance Tracker</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center gap-3">
              <ThemeSwitcher />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="login-page min-vh-100 d-flex align-items-center position-relative overflow-hidden">

        <div className="animated-background">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col style={{ maxWidth: '500px' }}>
              <Card className="border-0 shadow-lg animate-card">
                <Card.Body className="p-4 p-md-5">
                  <div className="text-center mb-4">
                    {/* <div className="mb-4 d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10">
                    <LogIn size={32} className="text-primary" />
                  </div> */}
                    <h2 className="fw-bold mb-2">Welcome Back</h2>
                    <p className="text-secondary mb-0">Enter your credentials to continue</p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        required
                        placeholder="name@example.com"
                        className="py-2"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        className="py-2"
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 py-2 mb-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      <LogIn size={18} />
                      Sign In
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}