import React, { FC, useState, useMemo, useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import { AddTaskForm } from './components/AddTaskForm/AddTaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { FilterValue } from './types';
import { TaskFilter } from './components/TaskFilter/TaskFilter';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from './theme/theme';
import { Container, Typography, CssBaseline, Box, AppBar, Toolbar, IconButton, Button } from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';

const THEME_MODE_STORAGE_KEY = 'react-todo-app-theme-mode';

const App: FC = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, editTask, handleDragEnd } = useTasks();
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor)
  );

  const { t, i18n } = useTranslation();
  const changeLanguageHandler = () => {
    const currentLang = i18n.language;
    const newLang = currentLang.startsWith('ru') ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  const targetThemeMode = mode === 'light' ? t('theme.dark') : t('theme.light');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={i18n.language === 'ru' ? ru : undefined}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('appTitle')}
            </Typography>
            <Button
              color="inherit"
              startIcon={<LanguageIcon />}
              onClick={changeLanguageHandler}
              title={t('toggleLang')}
              sx={{ mr: 1, textTransform: 'none' }}
            >
              {t('currentLang')}
            </Button>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit" title={t('toggleTheme', { mode: targetThemeMode })}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              {t('pageTitle')}
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
        </DndContext>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;