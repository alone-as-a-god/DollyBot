import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./NavbarStyle";
import { Button, IconButton, Typography } from "@material-ui/core";
import NavbarLink from "../NavbarLink/NavbarLink";
import { TweenMax, TimelineLite } from "gsap";
import { RiMenu3Fill } from "react-icons/ri";
import { useWindowWidth } from "../../hooks/useViewportWidth";
import Logo from "./logo.svg";
import MobileMenu from "../MobileMenu/MobileMenu";
import UserMenu from "../UserMenu/UserMenu";
import { UserContext } from "../../UserContext";
const { REACT_APP_LOGIN_URL } = process.env;
const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
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
    tl.to(navbar, 0, {
      overflow: "visible",
    });
  }, []);

  const width = useWindowWidth();
  const classes = useStyles();
  return (
    <div
      style={{ overflow: "hidden" }}
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
          <NavbarLink path="/">home</NavbarLink>
          <NavbarLink path="/about">about</NavbarLink>
          <NavbarLink path="/commands">commands</NavbarLink>
          {!user && <NavbarLink href={REACT_APP_LOGIN_URL}>login</NavbarLink>}
          <Button variant="contained" disableElevation color="primary" className={classes.button}>
            invite
          </Button>
          {user && <UserMenu user={user} setUser={setUser}></UserMenu>}
        </div>
      </nav>
      <div ref={(el) => (line = el)} className={classes.line}></div>
      {width < 960 && <MobileMenu open={open} setOpen={setOpen}></MobileMenu>}
    </div>
  );
};

export default Navbar;
