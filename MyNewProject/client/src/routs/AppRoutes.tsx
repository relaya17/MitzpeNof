// AppRoutes.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "../routs/routes";  // ייבוא הנתיבים מקובץ routes
import Home from "../pages/Home";
import NewResidentApproval from "../pages/NewResidentApproval";
import Error404Page from "../pages/404/Error404Page";
import PoolMaintenance from "../pages/PoolMaintenance";
import Gardening from "../pages/Gardening";
import EmployeeManagement from "../pages/EmployeeManagement";
import Footer from '../pages/Footer';  // ודא שייבאת את הפוטר
import axios from "axios";
import ForRent from "../pages/ForRent";
import ForSale from "../pages/ForSale";
import RepairTracking from "../pages/RepairTracking";
import ResidentForm from "../pages/ResidentForm";
import ThankYouPage from "../pages/thankyou/Thankyou";
import PrivacyPolicy from "../pages/seqerty/PrivacyPolicy";
import TermsAndConditions from "../pages/seqerty/TermsAndConditions";
import SignUpPage from "../pages/users/UI/SignUpPage";
import UsersListPage from "../pages/users/UI/UsersListPage";
import UserDetailsPage from "../pages/users/UI/UserDetailsPage";
import UsersPage from "../pages/users/UI/UsersPage";
import UserManagement from "../pages/users/UI/UserManagement";
import CreateAdminPassword from "../pages/users/UI/CreateAdminPassword";
import ChangeAdminPassword from "../pages/users/UI/ChangeAdminPassword";

const AppRoutes: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then((response) => {
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setError('הייתה שגיאה, נסה שנית');
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <div>טוען...</div>}
      {error && <div>{error}</div>}

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<SignUpPage />} />
        <Route path={ROUTES.RESIDENT_FORM} element={<ResidentForm name={""} age={undefined} familyStatus={""} apartment={""} onSubmit={function (): void {
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
        <Route path={ROUTES.EMPLOYEE_MANAGEMENT} element={<EmployeeManagement />} />
        <Route path={ROUTES.NEW_RESIDENT_APPROVAL} element={<NewResidentApproval />} />
        <Route path={ROUTES.REPAIR_TRACKING} element={<RepairTracking />} />
        <Route path={ROUTES.GARDENING} element={<Gardening />} />
        <Route path={ROUTES.FOR_RENT} element={<ForRent />} />
        <Route path={ROUTES.FOR_SALE} element={<ForSale />} />
        <Route path={ROUTES.POOL_MAINTENANCE} element={<PoolMaintenance />} />
        <Route path={ROUTES.THANK_YOU} element={<ThankYouPage />} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.TERMS_AND_CONDITIONS} element={<TermsAndConditions />} />
        <Route path={ROUTES.CREATE_ADMIN_PASSWORD} element={<CreateAdminPassword />} />
        <Route path={ROUTES.USER_DETAILS} element={<UserDetailsPage />} />
        <Route path={ROUTES.USERS_LIST} element={<UsersListPage />} />
        <Route path={ROUTES.USER_MANAGEMENT} element={<UserManagement />} />
        <Route path={ROUTES.CHANGE_ADMIN_PASSWORD} element={<ChangeAdminPassword />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>

      <Footer />
    </>
  );
};

export default AppRoutes;
