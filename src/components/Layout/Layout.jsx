import { Outlet } from "react-router-dom";

import classes from "./Layout.module.scss";

const Layout = () => (
  <main className={classes.main}>
    <Outlet />
  </main>
);

export default Layout;
