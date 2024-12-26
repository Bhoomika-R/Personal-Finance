import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

export function Summary() {
  const { summary } = useTransactions();

  const items = [
    {
      title: 'Total Income',
      amount: summary.income,
      icon: <TrendingUp className="text-success" size={24} />,
      variant: 'success',
    },
    {
      title: 'Total Expenses',
      amount: summary.expenses,
      icon: <TrendingDown className="text-danger" size={24} />,
      variant: 'danger',
    },
    {
      title: 'Net Balance',
      amount: summary.balance,
      icon: <DollarSign className="text-primary" size={24} />,
      variant: 'primary',
    },
  ];

  return (
    <Row className="g-4">
      {items.map((item) => (
        <Col key={item.title} md={4}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Subtitle className="text-muted mb-1">{item.title}</Card.Subtitle>
                  <Card.Title className="mb-0">${item.amount.toFixed(2)}</Card.Title>
                </div>
                {item.icon}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}