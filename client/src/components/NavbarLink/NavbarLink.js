import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./NavbarLinkStyle";
import { motion } from "framer-motion";
const NavbarLink = ({ path, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={`${classes.line}`}></div>
      <Link to={path} className={`${classes.root}`}>
        {children}
      </Link>
      {window.location.pathname === path ? (
        <motion.div
          layoutId="navbarlink"
          className={`${classes.line} ${window.location.pathname === path && classes.active}`}
          // transition={{ type: "spring", stiffness: 70 }}
        ></motion.div>
      ) : (
        <div className={`${classes.line}`}></div>
      )}
    </div>
  );
};

export default NavbarLink;
// ${ && classes.active}
