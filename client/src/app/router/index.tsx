import { createBrowserRouter } from "react-router-dom";
// import { Layout } from "./Layout/Layout";
import { AuthPage, HomePage, RegPage, NotFound, LoginPage } from "@/pages";
import { UserItem } from "@/entities/user";

export enum CLIENT_ROUTES {
  HOME = "/",
  AUTH = "/authorization",
  REG = "/registration",
  LOGIN = "/login",
  NOT_FOUND = "*",
  PROFILE = "/user/:id",
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
        element: <UserItem />,
      },
      {
        path: CLIENT_ROUTES.AUTH,
        element: <AuthPage />,
      },
      {
        path: CLIENT_ROUTES.REG,
        element: <RegPage />,
      },
      {
        path: CLIENT_ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
      {
        path: CLIENT_ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
]);
