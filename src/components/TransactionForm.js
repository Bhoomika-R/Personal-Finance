import React, { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useTransactions } from '../context/TransactionContext';

export function TransactionForm() {
  const formRef = useRef(null);
  const { addTransaction } = useTransactions();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const transaction = {
      name: formData.get('name'),
      amount: parseFloat(formData.get('amount')),
      type: formData.get('type'),
      date: new Date().toISOString(),
    };

    addTransaction(transaction);
    form.reset();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-4">Add Transaction</Card.Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Transaction Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              placeholder="Enter transaction name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              step="0.01"
              required
              min="0"
              placeholder="Enter amount"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" required>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Add Transaction
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}