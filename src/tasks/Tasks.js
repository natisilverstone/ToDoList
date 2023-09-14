import React, { useEffect, useState, useMemo } from "react";
import TasksForm from "./TasksForm";
import Popup from "../components/Popup";
import {
  Paper,
  makeStyles,
  Toolbar,
  InputAdornment,
  Card,
  Typography,
  CardContent,
} from "@material-ui/core";
import Button from "../components/Button";
import * as taskService from "../services/taskService";
import { Search } from "@material-ui/icons";
import SearchBox from "../components/SearchBox";
import AddIcon from "@material-ui/icons/Add";
import PageHeader from "../components/PageHeader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TaskCard from "../components/TaskCard";
import DisplayMap from "../components/DisplayMap";
import debounce from "lodash.debounce";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "15px",
    marginLeft: "38px",
  },
}));

export default function Tasks() {
  const classes = useStyles();
  const [records, setRecords] = useState(taskService.getAllTasks());
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const addOrEdit = (task, resetForm) => {
    if (task.id == "0") {
      taskService.insertTask(task);
    } else {
      taskService.updateTask(task);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(taskService.getAllTasks());
  };

  const deleteTask = (task) => {
    taskService.deleteTask(task);
    setRecords(taskService.getAllTasks());
  };

  const onCompleteChange = (isCompletedTask, task) => {
    task.isCompleted = isCompletedTask;
    taskService.updateTask(task);
    setRecords(taskService.getAllTasks());
  };

  const handleSearch = (searchInput) => {
    let resultTasks;
    if (searchInput == "") {
      setRecords(taskService.getAllTasks());
      return;
    } else {
      resultTasks = records.filter((task) =>
        task.taskName.toLowerCase().includes(searchInput)
      );
    }
    setRecords(resultTasks);
  };

  const openInPopup = (records) => {
    setRecordForEdit(records);
    setOpenPopup(true);
  };

  function createGeoJSONLocation(task) {
    const geoJSON = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [task.taskLocation],
      },
      properties: {
        isCompletedTask: task.isCompleted
      },
    };
    
    setRecords(records.concat(geoJSON))
    return geoJSON;
  }

  return (
    <>
      <PageHeader
        title="Todo List"
        subTitle="Your way to complete tasks easily"
        icon={<AssignmentIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <SearchBox
            label="Search Tasks"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Button
            text="Add Task"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
      </Paper>
      <div className={classes.cardWrapper}>
        {records.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={openInPopup}
            onCompleteChange={onCompleteChange}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <DisplayMap  tasks={records}  createGeoJSONLocation={records}/>
      </div>
      <Popup
        title="New Task Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TasksForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}
