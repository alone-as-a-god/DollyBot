import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: "1em",
    padding: "0 !important",
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    marginRight: "2rem",
    "&$focused": {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },
    "& label.Mui-focused": {
      color: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      padding: "0 !important",
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  inputText: {
    fontSize: "1.25em",
    color: theme.palette.secondary.main,
  },
  inputContainer: {
    minWidth: "250px",
    flexWrap: "wrap",
    display: "flex",
    flexWrap: "none",
    alignItems: "flex-end",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      "&>div": {
        marginBottom: "1rem",
      },
    },
  },
}));
