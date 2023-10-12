import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DatePicker from "../components/DatePicker";
import { useForm, Form } from "../hooks/useForm";
import Button from "../components/Button";
import Priority from "../components/Priority";
import Subject from "../components/Subject";
import TextInput from "../components/TextInput";
import initialValues from "../utils/taskIntialValues";
import DisplayMap from "../components/DisplayMap";
import useTaskLogic from "../hooks/useTaskLogic";

const TasksForm = ({ taskForEdit, edit, openPopup }) => {
  const {
    values,
    setValues,
    handleInputChange,
    handleDateChange,
    resetForm,
    handleSubmit,
    onClick,
    handleLocationSelected,
  } = useForm(initialValues);

  const {
    tasks
  } = useTaskLogic();

  useEffect(() => {
    if (taskForEdit != null)
      setValues({
        ...taskForEdit,
      });
  }, [taskForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextInput values={values} handleInputChange={handleInputChange} />
          <DatePicker values={values} handleInputChangeDate={handleDateChange} />
        </Grid>
        <Grid item xs={6}>
          <Priority values={values} handleInputChange={handleInputChange} />
          <Subject onClickSubject={onClick} values={values} />
        </Grid>
        <DisplayMap handleLocationSelected={handleLocationSelected} tasks={tasks} openPopup={openPopup}/>

        <div>
          {edit ? (
            <Button text="Edit" type="submit" />
          ) : (
            <Button text="Create" type="submit" />
          )}

          <Button text="Reset" color="default" onClick={resetForm} />
        </div>
      </Grid>
    </Form>
  );
};

export default TasksForm;
