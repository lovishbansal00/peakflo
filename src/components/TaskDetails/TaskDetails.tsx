import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Task, TaskStatus } from "../../types/task";
import { deleteTask, getTaskById, updateTask } from "../../utils/localStorage";

const TaskDetails: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!taskId) return;
    const isTask = getTaskById(taskId);

    if (isTask) setTask(isTask);
  }, [taskId]);

  if (!task) return <div>Task not found</div>;

  const handleSave = () => {
    if (!task) 
      return;
    updateTask(task);
    navigate("/");
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/");
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={task.status}
            label="Status"
            onChange={(e) =>
              setTask({ ...task, status: e.target.value as TaskStatus })
            }
          >
            <MenuItem value="not_started">Not Started</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          sx={{ mb: 3 }}
        />

        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskDetails;
