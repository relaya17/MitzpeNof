// import React, { useState, ChangeEvent, FormEvent } from "react";
// // import { Form, Button, Container, Row, Col } from "react-bootstrap";
//  import "bootstrap/dist/css/bootstrap.min.css";
// import { Form } from "react-router-dom";

// interface InputsValue {
//   first: string;
//   middle: string;
//   last: string;
//   email: string;
//   password: string;
//   phone: string;
//   url: string;
//   alt: string;
//   state: string;
//   country: string;
//   city: string;
//   street: string;
//   houseNumber: string;
//   zip: string;
// }

// const RegisterPage: React.FC = () => {
//   const [inputsValue, setInputsValue] = useState<InputsValue>({
//     first: "",
//     middle: "",
//     last: "",
//     email: "",
//     password: "",
//     phone: "",
//     url: "",
//     alt: "",
//     state: "",
//     country: "",
//     city: "",
//     street: "",
//     houseNumber: "",
//     zip: "",
//   });

//   const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setInputsValue((currentState) => ({
//       ...currentState,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const request = {
//         name: {
//           first: inputsValue.first,
//           middle: inputsValue.middle,
//           last: inputsValue.last,
//         },
//         phone: inputsValue.phone,
//         email: inputsValue.email,
//         password: inputsValue.password,
//         image: {
//           url: inputsValue.url,
//           alt: inputsValue.alt,
//         },
//         address: {
//           state: inputsValue.state,
//           country: inputsValue.country,
//           city: inputsValue.city,
//           street: inputsValue.street,
//           houseNumber: inputsValue.houseNumber,
//           zip: +inputsValue.zip,
//         },
//         isBusiness: false,
//       };
//       console.log("Submitting:", request);
//       // Replace this with your axios call
//       // const { data } = await axios.post("/users", request);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={8}>
//           <h1 className="text-center mb-4">Sign Up</h1>
//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3" controlId="first">
//                   <Form.Label>First Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.first}
//                     onChange={handleInputsChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3" controlId="middle">
//                   <Form.Label>Middle Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.middle}
//                     onChange={handleInputsChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3" controlId="last">
//                   <Form.Label>Last Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.last}
//                     onChange={handleInputsChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={inputsValue.email}
//                 onChange={handleInputsChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={inputsValue.password}
//                 onChange={handleInputsChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="phone">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control
//                 type="tel"
//                 value={inputsValue.phone}
//                 onChange={handleInputsChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="url">
//               <Form.Label>Image URL</Form.Label>
//               <Form.Control
//                 type="url"
//                 value={inputsValue.url}
//                 onChange={handleInputsChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="alt">
//               <Form.Label>Image Alt Text</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={inputsValue.alt}
//                 onChange={handleInputsChange}
//               />
//             </Form.Group>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="state">
//                   <Form.Label>State</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.state}
//                     onChange={handleInputsChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="country">
//                   <Form.Label>Country</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.country}
//                     onChange={handleInputsChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="city">
//                   <Form.Label>City</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.city}
//                     onChange={handleInputsChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="street">
//                   <Form.Label>Street</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.street}
//                     onChange={handleInputsChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="houseNumber">
//                   <Form.Label>House Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.houseNumber}
//                     onChange={handleInputsChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="zip">
//                   <Form.Label>Zip Code</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={inputsValue.zip}
//                     onChange={handleInputsChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Form.Group className="mb-3">
//               <Form.Check
//                 type="checkbox"
//                 label="Business Account"
//               />
//             </Form.Group>
//             <Button type="submit" variant="primary" className="w-100">
//               Sign Up
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default 
