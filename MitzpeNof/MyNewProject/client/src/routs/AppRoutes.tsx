import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import React, { useEffect } from "react";
import NewResidentApproval from "../pages/NewResidentApproval";
import Error404Page from "../pages/404/Error404Page";
import PoolMaintenance from "../pages/PoolMaintenance";
import Gardening from "../pages/Gardening";
// import AdminPage from "../users/UI/AdminPage";
// import RepairTracking from "../pages/RepairTracking";
import EmployeeManagement from "../pages/EmployeeManagement";
import Footer from '../pages/Footer';  // ודא שייבאת את הפוטר
import axios from "axios";
import ForRent from "../pages/ForRent";
import Residents from "../pages/ResidentForm";
import ForSale from "../pages/ForSale";
import RepairTracking from "../pages/RepairTracking";
import ResidentForm from "../pages/ResidentForm";



const AppRoutes = () => {
  useEffect(() => {
    axios.get('http://localhost:5000')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        console.error('Full Error:', error);
      });
  }, []);
  return (
    <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ResidentForm" element={<ResidentForm name={""} age={undefined} familyStatus={""} apartment={""} onSubmit={function (): void {
          throw new Error("Function not implemented.");
        } } setName={function (value: string): void {
          throw new Error("Function not implemented.");
        } } setAge={function (value: number | undefined): void {
          throw new Error("Function not implemented.");
        } } setFamilyStatus={function (value: string): void {
          throw new Error("Function not implemented.");
        } } setApartment={function (value: string): void {
          throw new Error("Function not implemented.");
        } } isEdit={false} />} />
      <Route path="/EmployeeManagement" element={<EmployeeManagement />} />
      <Route path="/NewResidentApproval" element={<NewResidentApproval />} />
      // <Route path="/repairtracking" element={<RepairTracking />} />
      <Route path="/gardening" element={<Gardening />} />
       <Route path="/ForRent" element={<ForRent />} />
      // <Route path="/ForSale" element={<ForSale />} />
      <Route path="/poolmaintenance" element={<PoolMaintenance />} />
      <Route path="*" element={<Error404Page />} /> 

    </Routes>
      <Footer />
      </>
  );
};

export default AppRoutes;
