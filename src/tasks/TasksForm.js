import React, { useEffect } from "react";
import TextInput from "../components/TextInput";
import Grid from "@material-ui/core/Grid";
import DatePicker from "../components/DatePicker";
import { useForm, Form } from "../components/useForm";
import Button from "../components/Button";
import Priority from "../components/Priority";
import Subject from "../components/Subject";
import OpenLayersMap from "../components/OpenLayersMap";

const initialValues = {
  id: 0,
  taskName: "",
  taskSubject: "",
  myPriority: 1,
  myDate: new Date(),
  taskLocation: [4, 0],
  isCompleted: false,
};

export default function TasksForm({ addOrEdit, recordForEdit }) {
  const {
    values,
    setValues,
    handleInputChange,
    resetForm,
    handleInputChangeDate,
  } = useForm(initialValues, true);

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  const onClickSubject = (subject) =>
    setValues((prevValues) => ({ ...prevValues, taskSubject: subject }));

  const handleSubmit = () => {
    console.log(values);
    addOrEdit(values, resetForm);
    resetForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextInput values={values} handleInputChange={handleInputChange} />
          <DatePicker
            values={values}
            handleInputChangeDate={handleInputChangeDate}
          />
        </Grid>
        <Grid item xs={6}>
          <Priority values={values} handleInputChange={handleInputChange} />
          <Subject
            onClickSubject={onClickSubject}
            values={values}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <OpenLayersMap handleLocationSelected={handleInputChange} />

        <div>
          <Button text="Create" type="submit" />

          <Button text="Reset" color="default" onClick={resetForm} />
        </div>
      </Grid>
    </Form>
  );
}
