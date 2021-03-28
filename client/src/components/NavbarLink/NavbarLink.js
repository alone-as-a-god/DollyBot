import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./NavbarLinkStyle";
const NavbarLink = ({ path, href, children }) => {
  const classes = useStyles();
  return (
    <>
      {href ? (
        <a href={href} className={classes.root}>
          {children}
        </a>
      ) : (
        <Link to={path} className={`${classes.root} ${window.location.pathname === path && classes.active}`}>
          {children}
        </Link>
      )}
    </>
  );
};

export default NavbarLink;
