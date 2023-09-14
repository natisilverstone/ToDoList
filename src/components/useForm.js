import { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false) {
  const [values, setValues] = useState(initialFValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleInputChangeDate = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialFValues);
  };

  return {
    values,
    setValues,
    handleInputChange,
    resetForm,
    handleInputChangeDate,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function Form({ children, ...other }) {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
}
