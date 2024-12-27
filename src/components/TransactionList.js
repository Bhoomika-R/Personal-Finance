import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { useTransactions } from '../context/TransactionContext';
import { ArrowUpRight, ArrowDownRight, Eye, Trash2 } from 'lucide-react';

export function TransactionList() {
  const { state, deleteTransaction } = useTransactions();
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-4">Recent Transactions</Card.Title>
        {state.transactions.length === 0 ? (
          <p className="text-center text-muted">No transactions yet</p>
        ) : (
          <ListGroup variant="flush">
            {state.transactions.map((transaction) => (
              <ListGroup.Item key={transaction.id} className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="text-success me-2" size={24} />
                  ) : (
                    <ArrowDownRight className="text-danger me-2" size={24} />
                  )}
                  <div>
                    <div className="fw-medium">{transaction.name}</div>
                    <small className="text-muted">
                      {format(new Date(transaction.date), 'PPP')}
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <Badge bg={transaction.type === 'income' ? 'success' : 'danger'}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </Badge>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => navigate(`/transaction/${transaction.id}`)}
                  >
                    <Eye size={18} />
                  </Button>
                  <Button
                      variant="light"
                      size="sm"
                      className="text-danger"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}