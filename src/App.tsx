import TaskBoard from "./components/TaskBoard/TaskBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskDetails from "./components/TaskDetails/TaskDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskBoard />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
