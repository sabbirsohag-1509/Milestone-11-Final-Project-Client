import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Error from "../pages/Error/Error";
import AuthLayout from "../layout/AuthLayout";
import LogIn from "../pages/Auth/LogIn/LogIn";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "../context/PrivateRoute/PrivateRoute";
import Rider from "../pages/BeARider/Rider";
import SendAParcel from "../pages/sendAParcel/SendAParcel";
import DashBoardLayout from "../layout/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Payment/PaymentHistory";
import ApprovalRiders from "../pages/Dashboard/ApprovalRiders/ApprovalRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "../context/PrivateRoute/AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRIders/AssignRiders";
import RiderRoute from "../context/PrivateRoute/RiderRoute";
import MyDeliveries from "../pages/Dashboard/MyDeliveries/MyDeliveries";
import ParcelTrack from "../pages/Home/ParcelTrack/ParcelTrack";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/parcel-track/:trackingId",
        Component: ParcelTrack,
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "/aboutUs",
        Component: AboutUs,
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendAParcel></SendAParcel>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "/dashboard/payment-history",
        Component: PaymentHistory,
      },
      //Rider Only Routes
      {
        path: "/dashboard/my-deliveries",
        element: (
          <RiderRoute>
            <MyDeliveries></MyDeliveries>
          </RiderRoute>
        ),
      },

      // Admin Only Routes
      {
        path: "/dashboard/approve-riders",
        element: (
          <AdminRoute>
            <ApprovalRiders></ApprovalRiders>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
