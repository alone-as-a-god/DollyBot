import { Button, Drawer, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./MobileMenuStyle";
import Logo from "../Navbar/logo.svg";
import { logout } from "../../functions/Authorization";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
const { REACT_APP_LOGIN_URL } = process.env;
const MobileMenu = ({ open, setOpen }) => {
  const [user, setUser] = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
      <div className={classes.drawerContainer}>
        <Link to="/" className={classes.logoContainer} style={{ justifyContent: "flex-start", margin: ".5em 0" }}>
          <img src={Logo} alt="dolly logo" className={classes.logo}></img>
          <Typography variant="h3" className={classes.logoText}>
            dolly
          </Typography>
        </Link>

        {user && (
          <div className={classes.userContainer}>
            {user.avatar ? (
              <img className={classes.avatar} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="" />
            ) : (
              <img
                className={classes.avatar}
                src={`https://eu.ui-avatars.com/api/?background=27283F&color=F9F7FF&name=${user.username.charAt(0)}`}
                alt={user.username}
              />
            )}

            <Typography className={classes.username} noWrap>
              {user.username}
            </Typography>
          </div>
        )}

        <Link className={`${classes.link} ${window.location.pathname === "/" && classes.active}`} to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link className={`${classes.link} ${window.location.pathname === "/about" && classes.active}`} to="/about" onClick={() => setOpen(false)}>
          About
        </Link>
        <Link
          className={`${classes.link} ${window.location.pathname === "/commands" && classes.active}`}
          to="/commands"
          onClick={() => setOpen(false)}
        >
          Commands
        </Link>

        {!user && (
          <a href={REACT_APP_LOGIN_URL} className={classes.link}>
            Login
          </a>
        )}
        {user && (
          <>
            <Link
              className={`${classes.link} ${window.location.pathname === "/dashboard" && classes.active}`}
              to="/dashboard"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <a
              className={classes.link}
              onClick={() => {
                logout(() => setUser());
                setOpen(false);
                history.push("/");
              }}
            >
              Logout
            </a>
          </>
        )}

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
  );
};

export default MobileMenu;
