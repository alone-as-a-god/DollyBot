import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./NavbarLinkStyle";
const NavbarLink = ({ children, to }) => {
  const classes = useStyles();
  return (
    <Link to={to} className={`${classes.root} ${window.location.pathname === to && classes.active}`}>
      {children}
    </Link>
  );
};

export default NavbarLink;
