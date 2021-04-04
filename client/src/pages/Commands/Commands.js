import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./CommandsStyle";
import { MdExpandMore } from "react-icons/md";
import { commands } from "../../utils/commands";
import { pageFadeIn, toTop } from "../../utils/animation";
const Commands = () => {
  const [expanded, setExpanded] = useState(-1);
  let commandRef = useRef(null);
  useEffect(() => {
    toTop();
    pageFadeIn(commandRef);
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        ref={(element) => {
          commandRef = element;
        }}
      >
        <Typography variant="h1" className={classes.title}>
          Commands
        </Typography>
        <Typography className={classes.text}>Use your prefix followed by the following commands</Typography>
        <div>
          {commands.map((command, index) => {
            return (
              <Accordion className={classes.accordion} expanded={expanded === index} onChange={handleChange(index)}>
                <AccordionSummary expandIcon={<MdExpandMore className={classes.icon} />} className={classes.accordionTitle}>
                  <Typography className={classes.commandName}>{command.name}</Typography>
                  {command.aliases !== undefined &&
                    command.aliases.map((alias) => {
                      return <Typography className={classes.alias}>{alias}</Typography>;
                    })}
                </AccordionSummary>
                <AccordionDetails className={classes.accordionText}>
                  <Typography> {command.description}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Commands;
