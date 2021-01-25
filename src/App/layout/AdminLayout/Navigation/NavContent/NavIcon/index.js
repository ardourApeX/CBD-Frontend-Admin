import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium } from "@fortawesome/free-brands-svg-icons";

const navIcon = (props) => {
  let navIcons = false;
  if (props.items.icon) {
    navIcons = (
      <span className="pcoded-micon">
        {/* <i className={props.items.icon} /> */}
        <FontAwesomeIcon className="nav-link-large" icon={props.items.icon} />
      </span>
    );
  }
  return navIcons;
};

export default navIcon;
