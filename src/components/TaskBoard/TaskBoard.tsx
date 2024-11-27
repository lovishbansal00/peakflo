import { Box, Container } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Task, TaskStatus } from "../../types/task";
import { getTasks, saveTasks } from "../../utils/localStorage";
import TaskColumn from "./TaskColumn";

const COLUMNS: TaskStatus[] = ["not_started", "in_progress", "completed"];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId as TaskStatus;
    newTasks.splice(result.destination.index, 0, movedTask);

    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const taskCounts = COLUMNS.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status).length;
    return acc;
  }, {} as Record<TaskStatus, number>);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box display="flex" gap={2}>
          {COLUMNS.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              taskCount={taskCounts[status]}
            />
          ))}
        </Box>
      </DragDropContext>
    </Container>
  );
}
