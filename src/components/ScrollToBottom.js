import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
    display: "none", 
  },
}));

const ScrollDownButton = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(
      window.scrollY <
        document.documentElement.scrollHeight - window.innerHeight
    );
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fab
      color="primary"
      aria-label="scroll to bottom"
      className={classes.root}
      onClick={scrollToBottom}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <KeyboardArrowDownIcon />
    </Fab>
  );
};

export default ScrollDownButton;
