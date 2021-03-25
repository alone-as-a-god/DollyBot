import React, { useState } from "react";
import { useStyles } from "./UserMenuStyle";
import { AiFillCaretDown } from "react-icons/ai";
import { useClickOutside } from "../../hooks/useClickOutside";
import { IconButton, Typography } from "@material-ui/core";
import { Icon } from "@iconify/react";
import dashboardIcon from "@iconify/icons-carbon/dashboard";
import { MdExitToApp } from "react-icons/md";
import { useHistory } from "react-router";
const UserMenu = ({ user }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  let options = useClickOutside(() => {
    setOpen(false);
  });
  return (
    <div className={classes.root} ref={options}>
      <img className={classes.avatar} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="" />
      <IconButton className={classes.icon} onClick={() => setOpen((open) => !open)}>
        <AiFillCaretDown />
      </IconButton>
      {open && (
        <div className={classes.options} style={{ zIndex: "99999" }}>
          <div className={classes.optionsItem} onClick={() => history.push("/dashboard")}>
            <Icon icon={dashboardIcon} className={classes.optionsIcon}></Icon>
            <Typography className={classes.text}>Dashboard</Typography>
          </div>
          <div className={classes.optionsItem}>
            <MdExitToApp className={classes.optionsIcon} />
            <Typography>Logout</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
