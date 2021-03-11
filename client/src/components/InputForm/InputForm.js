import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useStyles } from "./InputFormStyle";
const InputForm = ({ label, onSubmit, value, onChange }) => {
  const classes = useStyles();
  return (
    <form onSubmit={onSubmit}>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.input}
          label={label}
          required
          // fullWidth
          color="secondary"
          value={value}
          defaultValue={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          InputProps={{
            className: classes.inputText,
          }}
          InputLabelProps={{
            className: classes.inputText,
          }}
        ></TextField>
        <Button type="submit" color="secondary" variant="contained" disableElevation>
          submit
        </Button>
      </div>
    </form>
  );
};

export default InputForm;
