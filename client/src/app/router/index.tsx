import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LandingPage,
  NotFound,
  PersonalAccountPage,
  TicketPage,
} from "@/pages";

import { Layout } from "@/app/router/Layout/Layout.tsx";
import { LandingLayout } from "@/app/router/Layout/LandingLayout.tsx";

export enum CLIENT_ROUTES {
  LANDING = "/welcome",
  HOME = "/",
  NOT_FOUND = "*",
  PROFILE = "/profile/:id",
  TICKET_PAGE = "/tickets/:id",
}

export const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: CLIENT_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: CLIENT_ROUTES.PROFILE,
        element: <PersonalAccountPage />,
      },
      {
        path: CLIENT_ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
      {
        path: CLIENT_ROUTES.TICKET_PAGE,
        element: <TicketPage />,
      },
    ],
  },
  {
    path: CLIENT_ROUTES.LANDING,
    element: <LandingLayout />,
    children: [
      {
        path: CLIENT_ROUTES.LANDING,
        element: <LandingPage />,
      },
    ],
  },
]);
