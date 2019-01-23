import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Logout from "../components/Logout";

var indexRoutes = [
  { path: "/logout", name: "Logout", component: Logout },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
