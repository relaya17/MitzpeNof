import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../UI";
import { signUpUser } from "../redux/slice/SignUpSlice";

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpUser({ name, email, password }));
  };

  return (
    <Container className="mt-5">
      <h2>רישום משתמש חדש</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>שם מלא</Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>אימייל</Form.Label>
          <Form.Control
            type="email"
            placeholder="הכנס אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>סיסמה</Form.Label>
          <Form.Control
            type="password"
            placeholder="הכנס סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          הירשם
        </Button>
      </Form>
    </Container>
  );
};

export default SignUpPage;
