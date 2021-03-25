import { Button, Drawer, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "./MobileMenuStyle";
import Logo from "../Navbar/logo.svg";
import { links as menuLinks } from "../../utils/links";
const MobileMenu = ({ open, setOpen }) => {
  const classes = useStyles();
  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
      <div className={classes.drawerContainer}>
        <Link to="/" className={classes.logoContainer} style={{ justifyContent: "flex-start", margin: ".5em 0" }}>
          <img src={Logo} alt="dolly logo" className={classes.logo}></img>
          <Typography variant="h3" className={classes.logoText}>
            dolly
          </Typography>
        </Link>
        {menuLinks.map((link) => {
          return (
            <Link
              className={`${classes.link} ${window.location.pathname == link.path && classes.active}`}
              to={link.path}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}
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
