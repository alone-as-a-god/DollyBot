import { Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useStyles } from "./FooterStyle";
import Robot from "./robot.svg";
const Footer = () => {
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
        <IconButton href="mailto:dolly@gmail.com" className={classes.icon}>
          <FiMail></FiMail>
        </IconButton>
      </div>
      <div>
        <Typography className={classes.header}>functions</Typography>
        <Link className={classes.link}>
          <Typography className={classes.linkText}>login</Typography>
        </Link>
        <Link className={classes.link}>
          <Typography className={classes.linkText}>logout</Typography>
        </Link>
        <Link className={classes.link}>
          <Typography className={classes.linkText}>add to server</Typography>
        </Link>
      </div>
      <div>
        <Typography className={classes.header}>pages</Typography>
        <Link to="/" className={classes.link}>
          <Typography className={classes.linkText}>home</Typography>
        </Link>
        <Link to="/dashboard" className={classes.link}>
          <Typography className={classes.linkText}>dashboard</Typography>
        </Link>
      </div>
      <img src={Robot} className={classes.robot} />
    </div>
  );
};

export default Footer;
