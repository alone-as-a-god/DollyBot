import { Button, Drawer, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./MobileMenuStyle";
import Logo from "../Navbar/logo.svg";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import MobileLink from "../MobileLink/MobileLink";
const { REACT_APP_LOGIN_URL } = process.env;
const MobileMenu = ({ open, setOpen }) => {
  const [user, dispatch] = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
      <div className={classes.drawerContainer}>
        <Link to="/" className={classes.logoContainer}>
          <img src={Logo} alt="dolly logo" className={classes.logo}></img>
          <Typography variant="h3" className={classes.logoText}>
            dolly
          </Typography>
        </Link>

        {user && (
          <div className={classes.userContainer}>
            {user.avatar ? (
              <img className={classes.avatar} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="user icon" />
            ) : (
              <img
                className={classes.avatar}
                src={`https://eu.ui-avatars.com/api/?background=27283F&color=F9F7FF&name=${user.username.charAt(0)}`}
                alt="user icon"
              />
            )}

            <Typography className={classes.username} noWrap>
              {user.username}
            </Typography>
          </div>
        )}
        <MobileLink title="Home" to="/" onClick={() => setOpen(false)}></MobileLink>
        <MobileLink title="About" to="/about" onClick={() => setOpen(false)}></MobileLink>
        <MobileLink title="Commands" to="/commands" onClick={() => setOpen(false)}></MobileLink>

        {user && (
          <>
            <MobileLink title="Dashboard" to="/dashboard" includes onClick={() => setOpen(false)}></MobileLink>
            <MobileLink
              title="Logout"
              href="#"
              className={classes.link}
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                setOpen(false);
                history.push("/");
              }}
            >
              Logout
            </MobileLink>
          </>
        )}
        {!user && <MobileLink title="Login" href={REACT_APP_LOGIN_URL} includes onClick={() => setOpen(false)}></MobileLink>}

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
