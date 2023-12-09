import { Navigate, useNavigate, useLocation, useRoutes } from 'react-router-dom';
import { useState,useEffect } from 'react';
// layouts ----------------------------------------------------
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages ------------------------------------------------------
import LoginPage from './pages/LoginPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import LogoutPage from './pages/LogoutPage';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
// Sales Management --------------------------------------------
import QuotationPage from './pages/sales_management_pages/QuotationPage';
import ProformaInvoicePage from './pages/sales_management_pages/ProformaInvoicePage';
// Masters -----------------------------------------------------
import AircraftModelPage from './pages/masters_pages/AircraftModelPage';
import AircraftPage from './pages/masters_pages/AircraftPage';
import AirportPage from './pages/masters_pages/AirportPage';
import CityPage from './pages/masters_pages/CityPage';
import CountryPage from './pages/masters_pages/CountryPage';
import CrewPage from './pages/masters_pages/CrewPage';
import CTorDMPage from './pages/masters_pages/CTorDMPage';
import DelayCategoryPage from './pages/masters_pages/DelayCategoryPage';
import DelayExplanationPage from './pages/masters_pages/DelayExplanationPage';
import DutyStatusDetailPage from './pages/masters_pages/DutyStatusDetailPage';
import GroupPage from './pages/masters_pages/GroupPage';
import HotelPage from './pages/masters_pages/HotelPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// -------------------------------------------------------------


export default function Router({DB_URL}) {

  let sessionData = JSON.parse(localStorage.getItem("sessionData"));
  if(sessionData===null){
    sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
  }
  const [isLoggedIn, setIsLoggedIn] = useState(!(sessionData==null));

  const sessionId = isLoggedIn?sessionData.id:null;
  const userData = isLoggedIn?sessionData.userData:null;
  const loggedInUserId =isLoggedIn?sessionData.userData.user_id:null;

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    sessionStorage.clear();
  };

 const routes = useRoutes([
    {
      path: '/app',
      element: isLoggedIn ? <DashboardLayout userData={userData}/>:<Navigate to={"/404"}/>,
      children: [
        { element: <Navigate to="/app/dashboard" />, index: true },
        { path: 'dashboard', element: isLoggedIn ? <DashboardAppPage DB_URL={DB_URL}/> : <Navigate to={"/404"}/> },
        { path: 'user', element: <UserPage /> },
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
        { path: 'sales_management', children: [
            { element: <Navigate to="/app/sales_management/quotation"/>, index: true },
            { path: 'quotation', element: isLoggedIn ? <QuotationPage loggedInUserId={loggedInUserId} DB_URL={DB_URL}/> : <Navigate to={"/404"}/> },
            { path: 'proforma_invoice', element: isLoggedIn ? <ProformaInvoicePage loggedInUserId={loggedInUserId}  DB_URL={DB_URL}/> : <Navigate to={"/404"}/> },
        ]},
        // { path: 'trip_management', children: [
        //     { element: <Navigate to="/app/trip_management/crew_rostering"/>, index: true},
        //     { path: 'crew_rostering', element:  isLoggedIn ? <UserPage/> : <Navigate to={"/404"}/>},
        // ]},
        // { path: 'maintenance', children: [
        //     { element: <Navigate to="/app/maintenance/camo"/>, index: true},
        //     { path: 'camo', element:  isLoggedIn ? <BlogPage/> : <Navigate to={"/404"}/> },
        // ]},
        { path: 'masters', children: [
          { element: <Navigate to="/app/masters/aircraft_model"/>, index: true},
          { path: 'aircraft_model', element:  isLoggedIn ? <AircraftModelPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'aircraft', element:  isLoggedIn ? <AircraftPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'country', element:  isLoggedIn ? <CountryPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'city', element:  isLoggedIn ? <CityPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'airport', element:  isLoggedIn ? <AirportPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'duty_status_detail', element:  isLoggedIn ? <DutyStatusDetailPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'crew', element:  isLoggedIn ? <CrewPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'group', element:  isLoggedIn ? <GroupPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'delay_category', element:  isLoggedIn ? <DelayCategoryPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'delay_explanation', element:  isLoggedIn ? <DelayExplanationPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'crew_training/document_master', element:  isLoggedIn ? <CTorDMPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'hotel', element:  isLoggedIn ? <HotelPage userData={userData}/> : <Navigate to={"/404"}/> },
      ]},
      ],
    },
    {
      path: '/login',
      element: <LoginPage setIsLoggedIn={setIsLoggedIn}/>,
    },
    {
      path: '/logout',
      element: <LogoutPage handleLogout={handleLogout} sessionId={sessionId}/>
    },
    { path: '/register', 
      element:<RegisterPage/>
    },
    {
      element: <SimpleLayout />,
      children: [
        { element:  isLoggedIn ?  <Navigate to="/app/dashboard" /> : <Navigate to="/login" />, index: true },
        { path: 'mail_verification/:token', element:<VerifyEmailPage />},
        { path: 'forgot_password', element:<ForgotPasswordPage/>},
        { path: 'reset_password/:token', element: <ResetPasswordPage/> },
        { path: '404', element: <Page404 isLoggedIn={isLoggedIn}/> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
