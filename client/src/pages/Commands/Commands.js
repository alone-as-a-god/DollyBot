import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useStyles } from "./CommandsStyle";
import { MdExpandMore } from "react-icons/md";
import { TweenMax } from "gsap/gsap-core";
const Commands = () => {
  const commands = [
    { name: "play", description: "plays music" },
    { name: "prefix", description: "change prefix", aliases: ["p"] },
    { name: "clear", description: "clear queue", aliases: ["cls"] },
    { name: "next", description: "plays next song in queue/skips current song" },
    { name: "pause", description: "pauses music" },
    { name: "resume", description: "resumes music" },
    { name: "shuffle", description: "shuffles music in queue", aliases: ["mix"] },
  ];

  useEffect(() => {
    //TODO: api call
  }, []);
  let commandRef = useRef(null);
  useEffect(() => {
    TweenMax.from(commandRef, 2, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
    });
  }, []);

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
        <div className={classes.container}>
          {commands.map((command) => {
            return (
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<MdExpandMore className={classes.icon} />} className={classes.accordionTitle}>
                  <Typography variant="h5">{command.name}</Typography>
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