import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./MobileLinkStyle";
const MobileLink = ({ title, to, href, onClick, includes }) => {
  const classes = useStyles();
  return (
    <>
      {to ? (
        <Link
          className={`${classes.root}  ${(includes ? window.location.pathname.includes(to) : window.location.pathname === to) && classes.active}`}
          to={to}
          onClick={onClick}
        >
          <div
            className={`${classes.bar} ${(includes ? window.location.pathname.includes(to) : window.location.pathname === to) && classes.barActive}`}
          ></div>
          <Typography className={classes.text}>{title}</Typography>
        </Link>
      ) : (
        <a className={`${classes.root}  `} href={href} onClick={onClick}>
          <div className={`${classes.bar}`}></div>
          <Typography className={classes.text}>{title}</Typography>
        </a>
      )}
    </>
  );
};

export default MobileLink;
