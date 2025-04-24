import React, { FC } from 'react';
import { useTasks } from './hooks/useTasks';
import { AddTaskForm } from './components/AddTaskForm/AddTaskForm';
import { TaskList } from './components/TaskList/TaskList';
import {
  Container,
  Typography,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';

const App: FC = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useTasks();

  return (
    <>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do List MUI
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
        >
          My Tasks
        </Typography>

        <Box sx={{ mt: 3 }}>
          <AddTaskForm onAddTask={addTask} />

          <TaskList
            tasks={tasks}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        </Box>
      </Container>
    </>
  );
};

export default App;