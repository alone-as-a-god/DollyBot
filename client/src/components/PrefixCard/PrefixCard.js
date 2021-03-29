import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import { useStyles } from "./PrefixStyle";
import axios from "axios";
import InputForm from "../InputForm/InputForm";
const { REACT_APP_API_ENDPOINT } = process.env;
const PrefixCard = ({ refresh, guildID }) => {
  const [prefix, setPrefix] = useState({ status: "loading" });

  useEffect(() => {
    axios.get(`${REACT_APP_API_ENDPOINT}/prefix/${guildID}`).then((res) => {
      setPrefix({ status: "done", data: res.data.prefix, data_old: res.data.prefix });
    });
  }, [refresh]);

  const submitPrefix = (e) => {
    e.preventDefault();
    if (prefix.data === prefix.data_old) return; //dont call api if prefix is still  the same
    setPrefix({ ...prefix, status: "loading" });
    console.log("change prefix");
    axios.post(`${REACT_APP_API_ENDPOINT}/prefix`, { guildID: guildID, prefix: prefix.data }).then((res) => {
      console.log(res);
      setPrefix({ ...prefix, status: "done", data_old: prefix.data });
    });
  };

  const prefixChange = (value) => {
    setPrefix({ status: "done", ...prefix, data: value });
  };
  const classes = useStyles();
  return (
    <DashboardCard>
      <Typography variant="h3" className={classes.title}>
        Prefix
      </Typography>
      <Typography className={classes.text}>Set the prefix you want to use for your bot</Typography>
      <InputForm
        loading={prefix.status == "loading" ? true : false}
        value={prefix.data}
        onChange={prefixChange}
        onSubmit={submitPrefix}
        label="Prefix"
      ></InputForm>
    </DashboardCard>
  );
};

export default PrefixCard;
