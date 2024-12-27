import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import { useTransactions } from '../context/TransactionContext';
import { ArrowLeft, Calendar, IndianRupee, Tag, Info } from 'lucide-react';

export function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useTransactions();

  const transaction = state.transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <Container className="vh-100 d-flex align-items-center justify-content-center">
        <Card className="text-center p-5 shadow-sm border-0">
          <Card.Body>
            <h2 className="mb-4">Transaction not found</h2>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={18} className="me-2" />
              Back to Dashboard
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Button
            variant="link"
            className="mb-4 p-0 text-decoration-none d-inline-flex align-items-center"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={18} className="me-2" />
            Back to Dashboard
          </Button>

          <Card className="shadow-sm border-0">
            <Card.Header className="bg-transparent border-0 pt-4 px-4">
              <h4 className="mb-0 d-flex align-items-center">
                <Info size={20} className="me-2 text-primary" />
                Transaction Details
              </h4>
            </Card.Header>
            <Card.Body className="px-4 pb-4">
              <div className="mb-4 p-3 rounded-3" style={{ 
                backgroundColor: transaction.type === 'income' 
                  ? 'var(--bs-success-bg-subtle)' 
                  : 'var(--bs-danger-bg-subtle)'
              }}>
                <h3 className="h2 mb-0 text-center">
                  ${transaction.amount.toFixed(2)}
                </h3>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center text-primary me-3" style={{ width: '24px' }}>
                    <Tag size={18} />
                  </div>
                  <div>
                    <div className="text-secondary small">Name</div>
                    <div className="fw-medium">{transaction.name}</div>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center text-primary me-3" style={{ width: '24px' }}>
                    <IndianRupee size={18} />
                  </div>
                  <div>
                    <div className="text-secondary small">Type</div>
                    <Badge bg={transaction.type === 'income' ? 'success' : 'danger'}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center text-primary me-3" style={{ width: '24px' }}>
                    <Calendar size={18} />
                  </div>
                  <div>
                    <div className="text-secondary small">Date</div>
                    <div className="fw-medium">
                      {format(new Date(transaction.date), 'PPP')}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}