import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchoolFlag } from "@fortawesome/free-solid-svg-icons";
import DropdownOptions from "./dropdownOptions";
import css from "../../sidebar/sidebar.module.scss";

interface DropdownItem {
  label: string;
  options: { label: string; path: string }[];
}

const Dropdown: React.FC<{ item: DropdownItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      <div onClick={() => setIsOpen(!isOpen)} className={css.dropdownToggle}>
        <FontAwesomeIcon icon={faSchoolFlag} className={css.icons} />
        {item.label}
      </div>
      {isOpen && <DropdownOptions options={item.options} />}
    </li>
  );
};

export default Dropdown;
