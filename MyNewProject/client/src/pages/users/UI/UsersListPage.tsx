import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const UsersListPage: React.FC = () => {
  const users = [
    { id: 1, name: "משתמש 1" },
    { id: 2, name: "משתמש 2" },
    { id: 3, name: "משתמש 3" },
  ];

  return (
    <Container className="mt-5">
      <h2>רשימת משתמשים</h2>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UsersListPage;
