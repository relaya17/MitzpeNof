import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { RootState } from '';

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state: RootState) => state.signUp);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpUser(formData));
  };

  return (
    <Container style={{ maxWidth: '500px', marginTop: '50px' }}>
      <h2>הירשם</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>שם מלא</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="הכנס את שמך המלא"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>אימייל</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="הכנס את האימייל שלך"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>סיסמה</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="הכנס סיסמה"
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'ממתין...' : 'הירשם'}
        </Button>
      </Form>

      {status === 'error' && <Alert variant="danger" className="mt-3">אירעה שגיאה בהירשמות</Alert>}
      {status === 'success' && user && <Alert variant="success" className="mt-3">ברוך הבא, {user.name}!</Alert>}
    </Container>
  );
};

export default SignUpPage;
