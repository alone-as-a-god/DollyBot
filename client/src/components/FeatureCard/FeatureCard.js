import { useStyles } from "./FeatureCardStyle";
import { Typography } from "@material-ui/core";
const FeatureCard = ({ icon, text, title }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.iconContainer}>{icon}</div>
      <div className={classes.textContainer}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.text}> {text}</Typography>
      </div>
    </div>
  );
};

export default FeatureCard;
