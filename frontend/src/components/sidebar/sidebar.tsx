import React, { useState } from "react";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import Dropdown from "../common/dropdown-options/dropdown";
import css from "./sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHouse,
  faChartPie,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo-escuelas-blanco.png";

interface DropdownItem {
  label: string;
  options: { label: string; path: string }[];
}

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dropdownItems: DropdownItem[] = [
    {
      label: "Quinta normal",
      options: [
        { label: "1° nivel básico", path: "quinta-normal/1nb" },
        { label: "2° nivel básico", path: "quinta-normal/2nb" },
        { label: "3° nivel básico", path: "quinta-normal/3nb" },
        { label: "1° nivel medio", path: "quinta-normal/1nm" },
        { label: "2° nivel medio", path: "quinta-normal/2nm" },
      ],
    },
    {
      label: "Buín",
      options: [
        { label: "1° nivel básico", path: "buin/1nb" },
        { label: "2° nivel básico", path: "buin/2nb" },
        { label: "3° nivel básico", path: "buin/3nb" },
        { label: "1° nivel medio", path: "buin/1nm" },
        { label: "2° nivel medio", path: "buin/2nm" },
      ],
    },
    {
      label: "La Granja",
      options: [
        { label: "1° nivel básico", path: "la-granja/1nb" },
        { label: "2° nivel básico", path: "la-granja/2nb" },
        { label: "3° nivel básico", path: "la-granja/3nb" },
        { label: "1° nivel medio", path: "la-granja/1nm" },
        { label: "2° nivel medio", path: "la-granja/2nm" },
      ],
    },
    {
      label: "Ñuñoa",
      options: [
        { label: "1° nivel básico", path: "nunoa/1nb" },
        { label: "2° nivel básico", path: "nunoa/2nb" },
        { label: "3° nivel básico", path: "nunoa/3nb" },
        { label: "1° nivel medio", path: "nunoa/1nm" },
        { label: "2° nivel medio", path: "nunoa/2nm" },
      ],
    },
    {
      label: "Pudahuel",
      options: [
        { label: "1° nivel básico", path: "pudahuel/1nb" },
        { label: "2° nivel básico", path: "pudahuel/2nb" },
        { label: "3° nivel básico", path: "pudahuel/3nb" },
        { label: "1° nivel medio", path: "pudahuel/1nm" },
        { label: "2° nivel medio", path: "pudahuel/2nm" },
      ],
    },
    {
      label: "San Miguel",
      options: [
        { label: "1° nivel básico", path: "san-miguel/1nb" },
        { label: "2° nivel básico", path: "san-miguel/2nb" },
        { label: "3° nivel básico", path: "san-miguel/3nb" },
        { label: "1° nivel medio", path: "san-miguel/1nm" },
        { label: "2° nivel medio", path: "san-miguel/2nm" },
      ],
    },
  ];

  return (
    <>
      <button className={css.menuButton} onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      <div className={`${css.sidebar} ${isMenuOpen ? css.open : ""}`}>
        <img src={logo} alt="logo" className={css.logo} />
        <h3>Principal</h3>
        <ul>
          <li onClick={() => navigate("/dashboard")}>
            <FontAwesomeIcon icon={faHouse} className={css.icons} /> Dashboard
          </li>
          <li onClick={() => navigate("/dashboard/add-student")}>
            <FontAwesomeIcon icon={faGraduationCap} className={css.icons} />
            Agregar estudiante
          </li>
          <li onClick={() => navigate("/dashboard/estadisticas")}>
            <FontAwesomeIcon icon={faChartPie} className={css.icons} />
            Estadísticas
          </li>

          {/*           <li onClick={() => navigate("/dashboard/chat")}>
            <FontAwesomeIcon icon={faComments} className={css.icons} />
            Chat
          </li> */}
        </ul>

        <h3>Colegios</h3>
        <ul>
          {dropdownItems.map((item) => (
            <Dropdown key={item.label} item={item} />
          ))}
        </ul>

        <button onClick={handleLogout}>Salir</button>
      </div>
    </>
  );
};

export default Sidebar;
