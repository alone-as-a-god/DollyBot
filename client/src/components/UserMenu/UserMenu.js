import React, { useContext, useState } from "react";
import { useStyles } from "./UserMenuStyle";
import { AiFillCaretDown } from "react-icons/ai";
import { useClickOutside } from "../../hooks/useClickOutside";
import { IconButton, Typography } from "@material-ui/core";
import { Icon } from "@iconify/react";
import dashboardIcon from "@iconify/icons-carbon/dashboard";
import { MdExitToApp } from "react-icons/md";
import { useHistory } from "react-router";
import { logout } from "../../functions/Authorization";
import { UserContext } from "../../UserContext";
const UserMenu = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  let options = useClickOutside(() => {
    setOpen(false);
  });
  return (
    <div className={classes.root} ref={options}>
      {user.avatar ? (
        <img className={classes.avatar} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="" />
      ) : (
        <img
          className={classes.avatar}
          src={`https://eu.ui-avatars.com/api/?background=27283F&color=F9F7FF&name=${user.username.charAt(0)}`}
          alt={user.name}
        />
      )}

      <IconButton className={classes.icon} onClick={() => setOpen((open) => !open)}>
        <AiFillCaretDown />
      </IconButton>
      {open && (
        <div className={classes.options} style={{ zIndex: "99999" }}>
          <div
            className={classes.optionsItem}
            onClick={() => {
              history.push("/dashboard");
              setOpen(false);
            }}
          >
            <Icon icon={dashboardIcon} className={classes.optionsIcon}></Icon>
            <Typography className={classes.text}>Dashboard</Typography>
          </div>
          <div
            className={classes.optionsItem}
            onClick={() => {
              logout(() => setUser());
              setOpen(false);
              history.push("/");
            }}
          >
            <MdExitToApp className={classes.optionsIcon} />
            <Typography>Logout</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
