import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

interface Params {
  id: string;
}

const UserDetailsPage: React.FC = () => {
  const { id } = useParams<Params>();

  // לדוגמה - בהמשך אפשר למשוך מידע מ-Redux או API
  const user = {
    id,
    name: "משתמש לדוגמה",
    email: "example@example.com",
  };

  return (
    <Container className="mt-5">
      <h2>פרטי משתמש</h2>
      <p>שם: {user.name}</p>
      <p>אימייל: {user.email}</p>
    </Container>
  );
};

export default UserDetailsPage;
