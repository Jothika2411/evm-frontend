import { ROUTES } from "../components/constants/route.constant";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginPage from "../pages/Authentication/LoginPage";
import RegistrationPage from "../pages/Authentication/RegistrationPage";
import Events from "../pages/Events/Events";

const protectedRoutes = [
  { path: "/", Component: Dashboard },
  { path: ROUTES.DASHBOARD, Component: Dashboard },
  { path: ROUTES.EVENTS, Component: Events },
];

const publicRoutes = [
  { path: "/*", Component: LoginPage },
  { path: ROUTES.AUTH_LOGIN, Component: LoginPage },
  { path: ROUTES.AUTH_REGISTER, Component: RegistrationPage },
];

export { protectedRoutes, publicRoutes };
