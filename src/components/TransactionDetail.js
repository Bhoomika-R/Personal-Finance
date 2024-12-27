import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import { IndianRupee, Calendar, Tag, Info } from 'lucide-react';

export function TransactionDetail({ transaction }) {
  const details = [
    { icon: <Info size={18} />, label: 'Name', value: transaction.name },
    { 
      icon: <IndianRupee size={18} />, 
      label: 'Amount', 
      value: `$${transaction.amount.toFixed(2)}`,
      className: transaction.type === 'income' ? 'text-success' : 'text-danger'
    },
    { 
      icon: <Tag size={18} />, 
      label: 'Type',
      value: <Badge bg={transaction.type === 'income' ? 'success' : 'danger'}>
        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
      </Badge>
    },
    { 
      icon: <Calendar size={18} />, 
      label: 'Date', 
      value: format(new Date(transaction.date), 'PPP') 
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <Card.Title className="mb-4 d-flex align-items-center">
          <span className="me-2">Transaction Details</span>
        </Card.Title>
        
        <div className="list-group list-group-flush">
          {details.map((detail) => (
            <div key={detail.label} className="list-group-item border-0 px-0 py-3">
              <div className="d-flex align-items-center">
                <div className="me-3 text-primary">{detail.icon}</div>
                <div className="flex-grow-1">
                  <div className="text-muted small">{detail.label}</div>
                  <div className={`fw-medium ${detail.className || ''}`}>
                    {detail.value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}