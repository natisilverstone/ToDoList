import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
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

const ScrollToButton = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      aria-label="scroll to top"
      className={classes.root}
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollToButton;
