// src/pages/ForRent.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeApartment } from "../redux/slice/forRentSlice";
import { Card, Button } from "react-bootstrap";

const ForRent: React.FC = () => {
  const apartments = useSelector((state: RootState) => state.forRent.apartments);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeApartment(id));
  };

  return (
    <div>
      <h1>דירות להשכרה</h1>
      <div className="d-flex flex-wrap">
        {apartments.map((apartment) => (
          <Card style={{ width: "18rem", margin: "1rem" }} key={apartment.id}>
            <Card.Img variant="top" src={apartment.image} />
            <Card.Body>
              <Card.Title>{apartment.address}</Card.Title>
              <Card.Text>
                {apartment.description}
                <br />
                <strong>{apartment.price.toLocaleString()} ש"ח</strong>
              </Card.Text>
              <Button variant="danger" onClick={() => handleRemove(apartment.id)}>
                הסר דירה
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForRent;
