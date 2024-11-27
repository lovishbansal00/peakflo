import { Card, CardContent, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/task";
import { useNavigate } from "react-router-dom";

interface Props {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: Props) {
  const navigate = useNavigate();
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            cursor: "pointer",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "2px solid #e0e0e0",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.2s ease, box-shadow 0.2s ease", 
            "&:hover": {
              backgroundColor: "#f9f9ff", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
            },
          }}
          onClick={() => navigate(`/task/${task.id}`)}
        >
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
