import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentDetails, addPayment } from '../redux/slice/PaymentSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Button, Form, Alert } from 'react-bootstrap';

const PaymentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const payment = useSelector((state: RootState) => state.payment);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'payer' || name === 'amount') {
      dispatch(setPaymentDetails({ [name]: value }));
    } else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment.payer || !payment.amount || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
      setError('יש למלא את כל השדות');
      return;
    }

    dispatch(addPayment({ payer: payment.payer, amount: payment.amount }));
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
            type="password"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>תוקף</Form.Label>
          <Form.Control
            type="text"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="password"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleInputChange}
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
