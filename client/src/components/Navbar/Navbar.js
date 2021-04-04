import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./NavbarStyle";
import { Button, ButtonGroup, IconButton, Typography } from "@material-ui/core";
import NavbarLink from "../NavbarLink/NavbarLink";
import { TweenMax, TimelineLite } from "gsap";
import { RiMenu3Fill } from "react-icons/ri";
import { useWindowWidth } from "../../hooks/useViewportWidth";
import Logo from "./logo.svg";
import MobileMenu from "../MobileMenu/MobileMenu";
import UserMenu from "../UserMenu/UserMenu";
import { UserContext } from "../../UserContext";
import { AnimateSharedLayout, motion } from "framer-motion";
const { REACT_APP_LOGIN_URL, REACT_APP_INVITE_URL } = process.env;
const Navbar = () => {
  const [user] = useContext(UserContext);
  const [scroll, setScroll] = useState(false);
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();
  let tl = new TimelineLite();
  let logo = useRef(null);
  let links = useRef(null);
  let icon = useRef(null);
  useEffect(() => {
    return history.listen((location) => {
      setUrl(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    tl.from(
      logo,
      0.8,
      {
        opacity: "0",
        y: "20px",
        ease: "ease",
      },
      "+=.5"
    );
    tl.from(
      links,
      0.5,
      {
        opacity: "0",
        y: "20px",
        ease: "ease",
      },
      "-=.3"
    );
    tl.from(
      icon,
      0.5,
      {
        opacity: "0",
        y: "20px",
        ease: "power4.out",
      },
      "-=.3"
    );
  }, []);
  const handleScroll = () => {
    if (document.scrollingElement.scrollTop > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const width = useWindowWidth();

  useEffect(() => {
    if (width > 960) setOpen(false);
  }, [width]);
  const classes = useStyles();
  return (
    <>
      <nav className={`${classes.root}  ${scroll && classes.scroll}`}>
        <Link
          to="/"
          className={classes.logoContainer}
          ref={(el) => {
            logo = el;
          }}
        >
          <motion.svg width="626" height="626" viewBox="0 0 626 626" fill="none" xmlns="http://www.w3.org/2000/svg" className={classes.logo}>
            <path
              d="M313 626C485.865 626 626 485.865 626 313C626 140.135 485.865 0 313 0C140.135 0 0 140.135 0 313C0 485.865 140.135 626 313 626Z"
              fill={scroll ? "#474A80" : "#32345A"}
              id="circle"
            />
            <path
              d="M183.619 275.582H149.264V198.226C153.722 197.291 157.729 194.863 160.622 191.345C163.515 187.826 165.123 183.426 165.179 178.871C165.179 167.896 155.974 159 144.619 159C133.263 159 124.057 167.896 124.057 178.871C124.114 183.426 125.721 187.826 128.614 191.344C131.508 194.863 135.514 197.29 139.972 198.226V275.582H134.368C133.006 275.583 131.658 275.851 130.4 276.372C129.142 276.893 127.999 277.657 127.036 278.62C126.074 279.583 125.31 280.726 124.789 281.984C124.268 283.242 124 284.59 124 285.952V400.011C124 402.761 125.092 405.399 127.037 407.343C128.981 409.288 131.619 410.38 134.369 410.38H183.62C186.369 410.38 189.006 409.287 190.95 407.343C192.895 405.399 193.987 402.762 193.988 400.013V285.953C193.988 284.591 193.72 283.242 193.198 281.984C192.677 280.725 191.913 279.582 190.95 278.619C189.986 277.656 188.843 276.892 187.584 276.371C186.326 275.85 184.977 275.582 183.615 275.582H183.619Z"
              fill="#CADDE1"
            />
            <path
              d="M320.228 171.269C230.32 171.269 156.817 225.245 151.484 293.359L151.162 293.37V431.308H487.519V282.47C475.667 219.581 405.289 171.269 320.228 171.269Z"
              fill="white"
            />
            <path
              d="M265.637 234.929C208.924 234.929 162.559 268.976 159.197 311.941L158.994 311.948V398.957H371.162V305.073C363.686 265.402 319.293 234.929 265.637 234.929Z"
              fill="#2F333F"
            />
            <path
              d="M315.935 313.719H308.872C306.499 313.719 304.576 315.642 304.576 318.014V359.516C304.576 361.889 306.499 363.812 308.872 363.812H315.935C318.307 363.812 320.23 361.889 320.23 359.516V318.014C320.23 315.642 318.307 313.719 315.935 313.719Z"
              fill="#FEE735"
            />
            <path
              d="M195.399 313.719H188.337C185.964 313.719 184.041 315.642 184.041 318.014V359.516C184.041 361.889 185.964 363.812 188.337 363.812H195.399C197.772 363.812 199.695 361.889 199.695 359.516V318.014C199.695 315.642 197.772 313.719 195.399 313.719Z"
              fill="#FEE735"
            />
            <path
              d="M442.446 275.582H476.805V198.226C472.346 197.291 468.34 194.863 465.447 191.345C462.554 187.826 460.946 183.426 460.89 178.871C460.89 167.896 470.094 159 481.45 159C492.806 159 502.012 167.896 502.012 178.871C501.955 183.426 500.347 187.826 497.454 191.344C494.561 194.863 490.555 197.29 486.097 198.226V275.582H491.701C494.451 275.582 497.088 276.675 499.032 278.619C500.977 280.563 502.069 283.2 502.069 285.95V400.011C502.07 401.373 501.802 402.721 501.281 403.979C500.76 405.237 499.996 406.38 499.033 407.343C498.07 408.306 496.927 409.07 495.669 409.591C494.412 410.112 493.063 410.38 491.702 410.38H442.448C439.698 410.38 437.062 409.287 435.117 407.343C433.173 405.399 432.081 402.762 432.08 400.013V285.953C432.08 284.591 432.348 283.243 432.869 281.985C433.39 280.726 434.154 279.583 435.117 278.62C436.079 277.657 437.222 276.893 438.481 276.372C439.739 275.851 441.087 275.583 442.449 275.582H442.446Z"
              fill="#CADDE1"
            />
            <path d="M487.526 443.035L425.264 467.65L487.526 443.035Z" fill="#CADDE1" />
          </motion.svg>

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
        <AnimateSharedLayout>
          <div
            className={classes.linkContainer}
            ref={(el) => {
              links = el;
            }}
          >
            <NavbarLink path="/">home</NavbarLink>
            <NavbarLink path="/about">about</NavbarLink>
            <NavbarLink path="/commands">commands</NavbarLink>
            <div>
              {!user && (
                <Button
                  variant="outlined"
                  disableElevation
                  className={`${classes.button} ${classes.login}`}
                  color="secondary"
                  href={REACT_APP_LOGIN_URL}
                >
                  login
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                disableElevation
                className={` ${classes.button} ${scroll ? classes.buttonScroll : classes.invite}`}
                href={REACT_APP_INVITE_URL}
                target="_blank"
              >
                invite
              </Button>
            </div>

            {user && <UserMenu scroll={scroll}></UserMenu>}
          </div>
        </AnimateSharedLayout>
      </nav>
      <div className={classes.line}></div>
      {width < 960 && <MobileMenu open={open} setOpen={setOpen}></MobileMenu>}
    </>
  );
};

export default Navbar;
