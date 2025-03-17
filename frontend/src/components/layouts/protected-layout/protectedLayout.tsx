import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import css from "./protectedLayout.module.scss";

export default function ProtectedLayout() {
  return (
    <div className={css.layoutContainer}>
      <Sidebar />
      <main className={css.mainContent}>
        <div className={css.mainBackground}>
        <Outlet />
        </div>
      </main>
    </div>
  );
}
