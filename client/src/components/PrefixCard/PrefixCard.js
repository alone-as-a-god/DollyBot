import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import { useStyles } from "./PrefixStyle";
import InputForm from "../InputForm/InputForm";
const PrefixCard = () => {
  const getPrefix = () => {
    return "!";
  };
  const [prefix, setPrefix] = useState(getPrefix());
  const submitPrefix = (e) => {
    e.preventDefault();
    //TODO Post new prefix
    console.log(prefix);
  };
  const classes = useStyles();
  return (
    <DashboardCard>
      <Typography variant="h3" className={classes.title}>
        Prefix
      </Typography>
      <Typography className={classes.text}>Set the prefix you want to use for your bot</Typography>
      <InputForm value={prefix} onChange={setPrefix} onSubmit={submitPrefix} label="Prefix"></InputForm>
    </DashboardCard>
  );
};

export default PrefixCard;
