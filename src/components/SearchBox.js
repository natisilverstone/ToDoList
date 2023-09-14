import { TextField } from "@material-ui/core";

export default function SearchBox({
  name,
  label,
  error = null,
  onChange,
  ...other
}) { 
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
