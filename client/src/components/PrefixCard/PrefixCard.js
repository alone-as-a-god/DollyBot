import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import { useStyles } from "./PrefixStyle";
import axios from "axios";
import InputForm from "../InputForm/InputForm";
const { REACT_APP_API_ENDPOINT } = process.env;
const PrefixCard = ({ refresh, id }) => {
  const [prefix, setPrefix] = useState({ status: "loading" });

  useEffect(() => {
    axios.get(`${REACT_APP_API_ENDPOINT}/prefix/${id}`).then((res) => {
      setPrefix({ status: "done", data: res.data.prefix });
    });
  }, [refresh]);

  const submitPrefix = (e) => {
    e.preventDefault();
    setPrefix({ ...prefix, status: "loading" });
    axios.post(`${REACT_APP_API_ENDPOINT}/prefix/`, { guildID: id, prefix: prefix.data }).then((res) => {
      setPrefix({ ...prefix, status: "done" });
    });
  };

  const prefixChange = (prefix) => {
    setPrefix({ status: "done", data: prefix });
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
