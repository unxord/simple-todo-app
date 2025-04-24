import React, { FC, useState, useMemo, useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import { AddTaskForm } from './components/AddTaskForm/AddTaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { FilterValue } from './types';
import { TaskFilter } from './components/TaskFilter/TaskFilter';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from './theme/theme';
import {
  Container,
  Typography,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const THEME_MODE_STORAGE_KEY = 'react-todo-app-theme-mode';

const App: FC = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, editTask } = useTasks();
  const [filter, setFilter] = useState<FilterValue>('all');

  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem(THEME_MODE_STORAGE_KEY);
    return savedMode === 'dark' || savedMode === 'light' ? savedMode : 'light';
  });

  useEffect(() => {
    localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              To-Do List MUI
            </Typography>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit" title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
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
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;