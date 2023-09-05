import * as taskService from "../services/taskService";

export default function useCard() {
  const getTasks = () => {
    return taskService.getAllTasks();
  };

  return {
    getTasks,
  };
}
