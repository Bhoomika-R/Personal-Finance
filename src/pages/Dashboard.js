import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { Summary } from '../components/Summary';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="min-vh-100">
      <Navbar expand="lg" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand className="fw-bold">Finance Tracker</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center gap-3">
              <ThemeSwitcher />
              <span>{user?.email}</span>
              <Button variant="outline-primary" onClick={logout}>
                <LogOut size={18} />
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="pb-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
              <Summary />
              <TransactionList />
            </div>
          </div>
          <div className="col-lg-4">
            <TransactionForm />
          </div>
        </div>
      </Container>
    </div>
  );
}