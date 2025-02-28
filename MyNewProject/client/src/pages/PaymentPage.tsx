// src/pages/PaymentPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentDetails, clearPaymentDetails, addPayment } from '../redux/slice/PaymentSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Button, Form } from 'react-bootstrap';

const PaymentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const payment = useSelector((state: RootState) => state.payment);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPaymentDetails({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPayment(payment)); // שולח את נתוני התשלום לשרת
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
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>סכום</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={payment.amount}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>מספר כרטיס אשראי</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={payment.cardNumber}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>תוקף</Form.Label>
          <Form.Control
            type="text"
            name="expiryDate"
            value={payment.expiryDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="text"
            name="cvv"
            value={payment.cvv}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          שלח תשלום
        </Button>
      </Form>

      {payment.paymentStatus === 'pending' && <p>מתבצע תשלום...</p>}
      {payment.paymentStatus === 'completed' && (
       <div>
        <h3>תשלום בוצע בהצלחה!</h3>
        <a href={`data:application/pdf;base64,${payment.receipt}`} download="receipt.pdf">הורד קבלה</a>
       </div>
   )}
       {payment.paymentStatus === 'failed' && <p>הייתה שגיאה בתשלום, אנא נסה שוב.</p>}


export default PaymentPage;
