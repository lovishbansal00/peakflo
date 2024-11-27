// const TaskColumn = ({ status, tasks, taskCount }: TaskFromProps) => {
//   const [open, setOpen] = useState<boolean>(false);

//   return (
//     <Droppable droppableId={status}>
//       {(provided) => (
//         <Box
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//           sx={{
//             flex: 1,
//             minWidth: 300,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               padding: 2,
//               backgroundColor: "#f9f9f9",
//               borderRadius: "8px",
//             }}
//           >
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent="space-between"
//               sx={{
//                 padding: 1,
//                 marginBottom: 2,
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   padding: "4px 8px",
//                   borderRadius: "4px",
//                   backgroundColor: columnTitles[status].color,
//                 }}
//               >
//                 {columnTitles[status].title} ({taskCount})
//               </Typography>
//               <Box display="flex" alignItems="center">
//                 <IconButton size="small">
//                   <img
//                     src="/assets/dots.svg"
//                     alt="More options"
//                     style={{ width: 20, height: 20 }}
//                   />
//                 </IconButton>
//                 <IconButton size="small">
//                   <img
//                     src="/assets/plus.svg"
//                     alt="Add task"
//                     onClick={() => setOpen(true)}
//                     style={{ width: 20, height: 20 }}
//                   />
//                 </IconButton>
//               </Box>
//             </Box>

//             <Box>
//               {tasks.map((task, index) => (
//                 <TaskCard key={task.id} task={task} index={index} />
//               ))}
//               {provided.placeholder}
//             </Box>
//             <Button
//               variant="outlined"
//               onClick={() => setOpen(true)}
//               fullWidth
//               sx={{
//                 mb: 2,
//                 color: "#757575",
//                 borderColor: "#bdbdbd",
//                 "&:hover": {
//                   backgroundColor: "#f5f5f5",
//                 },
//               }}
//             >
//               + New
//             </Button>
//             {open && <TaskForm status={status} open={open} setOpen={setOpen} />}
//           </Paper>
//         </Box>
//       )}
//     </Droppable>
//   );
// };



import { Paper, Typography, Box, IconButton, Button } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import { Task, TaskStatus } from "../../types/task";
import TaskCard from "./TaskCard";
import TaskForm from "../TaskForm/TaskForm";
import { useState } from "react";

interface TaskFromProps {
  status: TaskStatus;
  tasks: Task[];
  taskCount: number;
}

const columnTitles: Record<TaskStatus, { title: string; color: string }> = {
  not_started: { title: "Not Started", color: "#ffcccc" },
  in_progress: { title: "In Progress", color: "#fff5cc" },
  completed: { title: "Completed", color: "#ccffcc" },
};

const TaskColumn = ({ status, tasks, taskCount }: TaskFromProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          height: "100%",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            padding: 1,
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: columnTitles[status].color,
            }}
          >
            {columnTitles[status].title} ({taskCount})
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton size="small">
              <img
                src="/assets/dots.svg"
                alt="More options"
                style={{ width: 20, height: 20 }}
              />
            </IconButton>
            <IconButton size="small" onClick={() => setOpen(true)}>
              <img
                src="/assets/plus.svg"
                alt="Add task"
                style={{ width: 20, height: 20 }}
              />
            </IconButton>
          </Box>
        </Box>

        <Droppable droppableId={status}>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ minHeight: 100 }}
            >
              {tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>

        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          fullWidth
          sx={{
            mt: 2,
            color: "#757575",
            borderColor: "#bdbdbd",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          + New
        </Button>
        {open && <TaskForm status={status} open={open} setOpen={setOpen} />}
      </Paper>
    </Box>
  );
};

export default TaskColumn;