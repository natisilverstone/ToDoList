import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000, // Ensure it's above other elements
    display: "none", // Initially hidden
  },
}));

const ScrollToButton = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Show the button when scrolling down, hide when at the top
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
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