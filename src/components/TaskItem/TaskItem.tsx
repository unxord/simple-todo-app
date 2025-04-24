import React, { FC, memo } from 'react';
import { ITask } from '../../types';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  ListItemIcon,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface TaskItemProps {
  task: ITask;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItemComponent: FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
}) => {
  const handleToggle = () => {
    onToggleComplete(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete task"
          onClick={handleDelete}
          title="Delete task"
        >
          <DeleteOutlineIcon />
        </IconButton>
      }

    >
      <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
        <Checkbox
          edge="start"
          checked={task.completed}
          onChange={handleToggle}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `task-label-${task.id}` }}
        />
      </ListItemIcon>
      <ListItemText
        id={`task-label-${task.id}`}
        primary={task.text}
        sx={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'text.disabled' : 'text.primary',
          wordBreak: 'break-word',
          pr: 1,
        }}
      />
    </ListItem>
  );
};

export const TaskItem = memo(TaskItemComponent);