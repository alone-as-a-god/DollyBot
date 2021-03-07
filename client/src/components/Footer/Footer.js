import { Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useStyles } from "./FooterStyle";

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}></Grid>
      <Grid item xs={2}>
        <Typography variant="h3" className={classes.logo}>
          DOLLY
        </Typography>
        <IconButton href="https://github.com/alone-as-a-god/DollyBot" target="_blank" className={classes.icon}>
          <FaGithub></FaGithub>
        </IconButton>
        <IconButton href="mailto:stniesepp@gmail.com" className={classes.icon}>
          <FiMail></FiMail>
        </IconButton>
      </Grid>

      <Grid item xs={2}>
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
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.header}>pages</Typography>
        <Link to="/" className={classes.link}>
          <Typography className={classes.linkText}>home</Typography>
        </Link>
        <Link to="/dashboard" className={classes.link}>
          <Typography className={classes.linkText}>dashboard</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
