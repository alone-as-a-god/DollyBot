import { IconButton, Typography } from "@material-ui/core";
import { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { AiOutlineBug } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useStyles } from "./FooterStyle";
import Robot from "./robot.svg";
const { REACT_APP_LOGIN_URL, REACT_APP_INVITE_URL } = process.env;
const Footer = () => {
  const [user, dispatch] = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h3" className={classes.logo}>
          DOLLY
        </Typography>
        <IconButton href="https://github.com/alone-as-a-god/DollyBot" target="_blank" className={classes.icon}>
          <FaGithub></FaGithub>
        </IconButton>
        <IconButton href="mailto:dollyparton.bot@gmail.com" target="_blank" className={classes.icon}>
          <FiMail></FiMail>
        </IconButton>

        <IconButton href="https://github.com/alone-as-a-god/DollyBot/issues/new" target="_blank" className={classes.icon}>
          <AiOutlineBug></AiOutlineBug>
        </IconButton>
      </div>
      <div className={classes.linksContainer}>
        <div>
          <Typography className={classes.title}>options</Typography>
          {user && (
            <a
              className={classes.link}
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                history.push("/");
              }}
            >
              <Typography className={classes.linkText}>logout</Typography>
            </a>
          )}
          {!user && (
            <a className={classes.link} href={REACT_APP_LOGIN_URL}>
              <Typography className={classes.linkText}>login</Typography>
            </a>
          )}

          <a className={classes.link} target="_blank" href={REACT_APP_INVITE_URL}>
            <Typography className={classes.linkText}>invite</Typography>
          </a>
        </div>
        <div>
          <Typography className={classes.title}>pages</Typography>
          <Link to="/" className={classes.link}>
            <Typography className={classes.linkText}>home</Typography>
          </Link>
          {user && (
            <Link to="/dashboard" className={classes.link}>
              <Typography className={classes.linkText}>dashboard</Typography>
            </Link>
          )}
          <Link to="/commands" className={classes.link}>
            <Typography className={classes.linkText}>commands</Typography>
          </Link>
          <Link to="/about" className={classes.link}>
            <Typography className={classes.linkText}>about</Typography>
          </Link>
        </div>
      </div>
      <img src={Robot} className={classes.robot} alt="robot icon" />
    </div>
  );
};

export default Footer;
