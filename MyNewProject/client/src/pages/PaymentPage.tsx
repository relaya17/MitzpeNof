// pages/PaymentPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentDetails } from '../redux/slice/PaymentSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Button, Form, Alert } from 'react-bootstrap';

const PaymentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const payment = useSelector((state: RootState) => state.payment);

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment.payer || !payment.amount || !payment.cardNumber || !payment.expiryDate || !payment.cvv) {
      setError('יש למלא את כל השדות');
      return;
    }

    // עדכון פרטי התשלום ל-Redux
    dispatch(setPaymentDetails({
      payer: payment.payer,
      amount: payment.amount,
      cardNumber: payment.cardNumber,
      expiryDate: payment.expiryDate,
      cvv: payment.cvv
    }));

    setError('');
    alert('תשלום בוצע בהצלחה!');
  };

  return (
    <div className="payment-form">
      <h2>תשלום</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>שם הלקוח</Form.Label>
          <Form.Control
            type="text"
            name="payer"
            value={payment.payer}
            onChange={(e) => dispatch(setPaymentDetails({ payer: e.target.value }))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>סכום</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={payment.amount}
            onChange={(e) => dispatch(setPaymentDetails({ amount: Number(e.target.value) }))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>מספר כרטיס אשראי</Form.Label>
          <Form.Control
            type="password"
            name="cardNumber"
            value={payment.cardNumber}
            onChange={(e) => dispatch(setPaymentDetails({ cardNumber: e.target.value }))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>תוקף</Form.Label>
          <Form.Control
            type="text"
            name="expiryDate"
            value={payment.expiryDate}
            onChange={(e) => dispatch(setPaymentDetails({ expiryDate: e.target.value }))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="password"
            name="cvv"
            value={payment.cvv}
            onChange={(e) => dispatch(setPaymentDetails({ cvv: e.target.value }))}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          שלח תשלום
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export default PaymentPage;
