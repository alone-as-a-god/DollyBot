import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useStyles } from "./InputFormStyle";
const InputForm = ({ loading, label, onSubmit, value, defaultValue, onChange }) => {
  const classes = useStyles();
  return (
    <form onSubmit={onSubmit}>
      <div className={classes.inputContainer}>
        {value !== undefined && (
          <TextField
            className={classes.input}
            label={label}
            required
            fullWidth
            color="secondary"
            defaultValue={defaultValue}
            value={value}
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
        )}

        <div className={classes.buttonContainer}>
          <Button disabled={loading} type="submit" color="secondary" variant="contained" disableElevation className={classes.button}>
            submit
          </Button>
          {loading && (
            <CircularProgress
              style={{ position: "absolute", top: "50%", left: "50%", color: "white", marginTop: "-12px", marginLeft: "-12px" }}
              size={24}
            ></CircularProgress>
          )}
        </div>
      </div>
    </form>
  );
};

export default InputForm;
