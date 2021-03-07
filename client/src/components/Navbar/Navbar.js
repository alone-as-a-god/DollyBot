import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./NavbarStyle";
import { Button, Typography } from "@material-ui/core";
import NavbarLink from "../NavbarLink/NavbarLink";
import { TweenMax, TimelineLite } from "gsap";
const Navbar = () => {
  const [url, setUrl] = useState("");
  const history = useHistory();
  let tl = new TimelineLite();
  let logo = useRef(null);
  let links = useRef(null);
  let line = useRef(null);
  let navbar = useRef(null);
  useEffect(() => {
    return history.listen((location) => {
      setUrl(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    TweenMax.to(navbar, 0, { css: { visibility: "visible" } });
    tl.from(line, 0.6, {
      x: "-100%",
      ease: "power4.in",
    });
    tl.from(logo, 0.8, {
      opacity: "0",
      y: "10px",
    });
    tl.from(
      links,
      0.5,
      {
        opacity: "0",
        y: "10px",
      },
      "-=.3"
    );
  }, []);

  const classes = useStyles();
  return (
    <div
      ref={(el) => {
        navbar = el;
      }}
    >
      <nav className={classes.root}>
        <Typography
          style={{ color: "inherit", textDecoration: "none" }}
          component={Link}
          to="/"
          variant="h3"
          ref={(el) => {
            logo = el;
          }}
        >
          dolly
        </Typography>
        <div
          className={classes.linkContainer}
          ref={(el) => {
            links = el;
          }}
        >
          <NavbarLink to="/">home</NavbarLink>
          <NavbarLink to="/dashboard">dashboard</NavbarLink>
          <NavbarLink to="/login">login</NavbarLink>
          <Button variant="outlined" color="secondary" style={{ padding: ".125em" }}>
            Add
          </Button>
        </div>
      </nav>
      <div ref={(el) => (line = el)} className={classes.line}></div>
    </div>
  );
};

export default Navbar;
