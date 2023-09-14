import TextField from "@material-ui/core/TextField";

export default function TextInput({ handleInputChange,values}) {
  return (
    <div>
      <TextField
        label="TaskName"
        placeholder="Enter Your Task"
        multiline
        variant="outlined"
        name="taskName"
        value={values.taskName}
        onChange={(newInput) => {
          handleInputChange(newInput);
        }}
      />
    </div>
  );
}
