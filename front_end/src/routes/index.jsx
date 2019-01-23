import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Logout from "../components/Logout";

var indexRoutes = [
  { path: "/", name: "Home", component: Dashboard },
  { path: "/logout", name: "Logout", component: Logout }
];

export default indexRoutes;
