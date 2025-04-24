import React, { FC, useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { AddTaskForm } from './components/AddTaskForm/AddTaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { FilterValue } from './types';
import { TaskFilter } from './components/TaskFilter/TaskFilter';
import {
  Container,
  Typography,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';

const App: FC = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, editTask } = useTasks();

  const [filter, setFilter] = useState<FilterValue>('all');

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

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
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          My Tasks
        </Typography>

        <Box sx={{ mt: 3 }}>
          <AddTaskForm onAddTask={addTask} />

          <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </Box>
      </Container>
    </>
  );
};

export default App;