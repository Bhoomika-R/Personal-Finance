import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

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

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            Sign in to your account
          </h2>
          <form className="w-full mt-16" onSubmit={handleSubmit}>
            <div className="d-flex flex-column align-items-center rounded shadow-sm gap-4">
              <div style={{ width: '350px', borderRadius: '5px' }}>
                <label htmlFor="email" className="form-label visually-hidden">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-control rounded-0"
                  placeholder="Email address"
                />
              </div>
              <div style={{ width: '350px', borderRadius: '5px' }}>
                <label htmlFor="password" className="form-label visually-hidden">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-control rounded-0"
                  placeholder="Password"
                />
              </div>
              <div>
                <Button
                  variant="primary"
                  type="submit"
                  style={{width:'350px'}}
                  className="py-2 px-4 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Sign in
                </Button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
