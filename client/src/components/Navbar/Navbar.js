import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./NavbarStyle";
import { Button, IconButton, Typography, Drawer } from "@material-ui/core";
import NavbarLink from "../NavbarLink/NavbarLink";
import { TweenMax, TimelineLite } from "gsap";
import { RiMenu3Fill } from "react-icons/ri";
import { useWindowWidth } from "../../hooks/useViewportWidth";
import Logo from "./logo.svg";
const Navbar = () => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();
  let tl = new TimelineLite();
  let logo = useRef(null);
  let links = useRef(null);
  let line = useRef(null);
  let navbar = useRef(null);
  let icon = useRef(null);
  useEffect(() => {
    return history.listen((location) => {
      setUrl(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    TweenMax.to(navbar, 0, { css: { visibility: "visible" } });
    TweenMax.from(navbar, 0.6, {
      opacity: "0",
      scaleY: "2",
    });
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
    tl.from(
      icon,
      0.5,
      {
        opacity: "0",
        y: "10px",
      },
      "-=.3"
    );
  }, []);

  const width = useWindowWidth();
  const classes = useStyles();
  return (
    <div
      ref={(el) => {
        navbar = el;
      }}
    >
      <nav className={classes.root}>
        <Link
          to="/"
          className={classes.logoContainer}
          ref={(el) => {
            logo = el;
          }}
        >
          <img src={Logo} alt="dolly logo" className={classes.logo}></img>
          <Typography variant="h3" className={classes.logoText}>
            dolly
          </Typography>
        </Link>
        <IconButton
          onClick={() => setOpen(true)}
          className={classes.icon}
          ref={(el) => {
            icon = el;
          }}
        >
          <RiMenu3Fill></RiMenu3Fill>
        </IconButton>
        <div
          className={classes.linkContainer}
          ref={(el) => {
            links = el;
          }}
        >
          <NavbarLink to="/">home</NavbarLink>
          <NavbarLink to="/dashboard">dashboard</NavbarLink>
          <NavbarLink to="/about">about</NavbarLink>
          <NavbarLink to="/commands">commands</NavbarLink>
          <NavbarLink to="/login">login</NavbarLink>
          <Button variant="contained" disableElevation color="primary" className={classes.button}>
            invite
          </Button>
        </div>
      </nav>
      <div ref={(el) => (line = el)} className={classes.line}></div>
      {width < 960 && (
        <Drawer open={open} className={classes.drawer} onClose={() => setOpen(false)} anchor="right">
          <div className={classes.drawerContainer}>
            <Link to="/" className={classes.logoContainer} style={{ justifyContent: "flex-start", margin: ".5em 0" }}>
              <img src={Logo} alt="dolly logo" className={classes.logo}></img>
              <Typography variant="h3" className={classes.logoText}>
                dolly
              </Typography>
            </Link>
            <Link className={classes.link} to="/" onClick={() => setOpen(false)}>
              home
            </Link>
            <Link className={classes.link} to="/dashboard" onClick={() => setOpen(false)}>
              dashboard
            </Link>
            <Link className={classes.link} to="/about" onClick={() => setOpen(false)}>
              about
            </Link>
            <Link className={classes.link} to="/commands" onClick={() => setOpen(false)}>
              commands
            </Link>
            <Link className={classes.link} to="/login" onClick={() => setOpen(false)}>
              login
            </Link>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              className={`${classes.drawerButton} ${classes.button} `}
              onClick={() => setOpen(false)}
            >
              invite
            </Button>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default Navbar;
