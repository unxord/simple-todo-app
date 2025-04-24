import React, { FC } from 'react';
import { ITask } from '../../types';
import { TaskItem } from '../TaskItem/TaskItem';
import { List, Box, Typography, Divider } from '@mui/material';

interface TaskListProps {
  tasks: ITask[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  title?: string;
}

export const TaskList: FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  title = 'Tasks',
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      {title && (
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
      )}

      {tasks.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          No tasks yet. Add one above!
        </Typography>
      ) : (
        <List disablePadding>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <TaskItem
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
              {index < tasks.length - 1 && <Divider component="li" variant="inset" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};