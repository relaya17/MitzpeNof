// src/pages/SignUpPage.tsx
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../redux/slice/SignUpSlice';
import { AppDispatch, RootState } from '../redux/store';

// הגדרת סוג (Type) עבור formData
interface FormData {
  name: string;
  email: string;
  password: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signUpStatus = useSelector((state: RootState) => state.signUp.status);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    status: 'idle'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpUser(formData)); // שולחים את הנתונים ל-Redux בלי סטטוס
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <h2>הרשמה</h2>

        <Form.Group className="mb-3">
          <Form.Label>שם</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>אימייל</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>סיסמה</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={signUpStatus === 'loading'}>
          {signUpStatus === 'loading' ? 'רישום...' : 'הירשם'}
        </Button>

        {signUpStatus === 'failed' && (
          <Alert variant="danger" className="mt-3">
            הייתה שגיאה ברישום. נסה שנית.
          </Alert>
        )}
        {signUpStatus === 'succeeded' && (
          <Alert variant="success" className="mt-3">
            נרשמת בהצלחה!
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default SignUpPage;
