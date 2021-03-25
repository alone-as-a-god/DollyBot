import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./NavbarLinkStyle";
const NavbarLink = ({ link }) => {
  const classes = useStyles();
  return (
    <>
      {link.href ? (
        <a href={link.href} className={classes.root}>
          {link.name}
        </a>
      ) : (
        <Link
          to={link.path}
          className={`${classes.root} ${
            !link.includes ? window.location.pathname === link.path && classes.active : window.location.pathname.includes(link.path) && classes.active
          }`}
        >
          {link.name}
        </Link>
      )}
    </>
  );
};

export default NavbarLink;
