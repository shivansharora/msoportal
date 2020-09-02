import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

import AuthLayout from "./layouts/Auth";
import ErrorLayout from "./layouts/Error";
import DashboardLayout from "./layouts/Dashboard";
import Dashboard from "./views/Dashboard";
// import DoctorCategory from './views/DoctorCategory/DoctorCategory';

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
  {
    path: "/auth",
    component: AuthLayout,
    routes: [
      {
        path: "/auth/login",
        exact: true,
        component: lazy(() => import("views/Login")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    path: "/errors",
    component: ErrorLayout,
    routes: [
      {
        path: "/errors/error-404",
        exact: true,
        component: lazy(() => import("views/Error404")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },

  {
    route: "*",
    component: DashboardLayout,
    routes: [
      {
        path: "/dashboard",
        exact: true,
        component: Dashboard,
      },
      {
        path: "/doctor_category",
        exact: true,
        component: lazy(() => import("./views/DoctorCategory/DoctorCategory")),
      },
      {
        path: "/doctor_category/:id",
        exact: true,
        component: lazy(() => import("./views/ViewDoctorBio/ViewBio")),
      },
      {
        path: "/patient_list",
        exact: true,
        component: lazy(() => import("./views/PatientList/PatientList2")),
      },
      {
        path: "/patient_list/:id/:type",
        exact: true,
        component: lazy(() =>
          import("./views/PatientListDetail/PatientListDetail")
        ),
      },

      {
        path: "/create_patient",
        exact: true,
        component: lazy(() => import("./views/CreatePatient/CreatePatient")),
      },
      {
        path: "/edit_patient/:id",
        exact: true,
        component: lazy(() => import("./views/CreatePatient/EditPatient")),
      },
      {
        path: "/family_history/:id/:type",
        exact: true,
        component: lazy(() => import("./components/Forms/FamilyHistory")),
      },
      {
        path: "/lifestyle/:id/:type",
        exact: true,
        component: lazy(() => import("./components/Forms/LifeStyle")),
      },
      {
        path: "/vital/:id/:type",
        exact: true,
        component: lazy(() => import("./components/Forms/Vitals")),
      },
      {
        path: "/edit_vital/:id/:type",
        exact: true,
        component: lazy(() => import("./components/Forms/EditVital")),
      },
      {
        path: "/allergy/:id/:type",
        exact: true,
        component: lazy(() => import("./components/Forms/Allergy")),
      },
      {
        path: "/edit_allergy/:id/:type",
        exact: true,
        component: lazy(() => import("./components/Forms/EditAllergy")),
      },
      {
        path: "/current_medication/:id/:type",
        exact: true,
        component: lazy(() => import("./components/Forms/CurrentMedication")),
      },
      {
        path: "/medical_problem/:id/:type",
        exact: true,
        component: lazy(() => import("./components/Forms/MedicalProblem")),
      },
      {
        path: "/edi_medical_problem/:id",
        exact: true,
        component: lazy(() => import("./components/Forms/EditMedicalProblems")),
      },
      {
        path: "/book_appointment",
        exact: true,
        component: lazy(() =>
          import("./views/BookAppointment/BookAppointment")
        ),
      },
      {
        path: "/create_appointment/:id",
        exact: true,
        component: lazy(() =>
          import("./views/BookAppointment/CreateAppointment/CreateAppointment")
        ),
      },
      {
        path: "/appointment_detail/:id",
        exact: true,
        component: lazy(() =>
          import("./views/AppointmentList/AppointmentDetail")
        ),
      },
      {
        path: "/change_appointment_status/:id/:type",
        exact: true,
        component: lazy(() =>
          import(
            "./views/AppointmentList/ChangeAppointmentStatus/ChangeAppointmentStatus"
          )
        ),
      },
      {
        path: "/edit_book_appointment/:id",
        exact: true,
        component: lazy(() =>
          import("./views/BookAppointment/EditBookAppointment")
        ),
      },
      {
        path: "/book_appointment_list",
        exact: true,
        component: lazy(() =>
          import("./views/AppointmentList/AppointmentList")
        ),
      },

      {
        path: "/flow_board",
        exact: true,
        component: lazy(() => import("./views/FlowBoard/FlowBoard")),
      },
      {
        path: "/change_flowboard_status/:id/:type",
        exact: true,
        component: lazy(() =>
          import("./views/FlowBoard/StatusChangeForm/StatusChangeForm")
        ),
      },
      {
        path: '/promocode',
        exact: true,
        component: lazy(() => import('./views/PromoCode/Promocode'))
      },
      {
        path: '/create_promocode',
        exact: true,
        component: lazy(() => import('./views/PromoCode/CreatePromocode'))
      },
      {
        path: '/edit_promocode/:id',
        exact: true,
        component: lazy(() => import('./views/PromoCode/EditPromocode'))
      },
      {
        path: "/notification",
        exact: true,
        component: lazy(() => import("./views/Notification")),
      },
      {
        path: "/notification/:id",
        exact: true,
        component: lazy(() => import("./views/Notification")),
      },
      {
        path: "/create_patient/webcam",
        exact: true,
        component: lazy(() => import("./components/Webcam/Webcam")),
      },
      {
        path: "/profile",
        exact: true,
        component: lazy(() => import("./views/UserProfile/UserProfileTab")),
      },

      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
];

export default routes;
