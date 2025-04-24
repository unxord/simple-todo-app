import React, { FC, memo, useState, useRef, useEffect } from 'react';
import { ITask } from '../../types';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  ListItemIcon,
  TextField,
  Box,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface TaskItemProps {
  task: ITask;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TaskItemComponent: FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);


  const handleToggle = () => {
    onToggleComplete(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleEditClick = () => {
    setEditText(task.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
    } else {
        handleCancel();
        return;
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        handleSave();
    } else if (event.key === 'Escape') {
        handleCancel();
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {isEditing ? (
            <>
              <IconButton edge="end" aria-label="save task" onClick={handleSave} title="Save changes">
                <CheckIcon />
              </IconButton>
              <IconButton edge="end" aria-label="cancel editing" onClick={handleCancel} title="Cancel changes">
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton edge="end" aria-label="edit task" onClick={handleEditClick} title="Edit task">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete task" onClick={handleDelete} title="Delete task">
                <DeleteOutlineIcon />
              </IconButton>
            </>
          )}
        </Box>
      }
      disablePadding
    >
      <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
        <Checkbox
          edge="start"
          checked={task.completed}
          onChange={handleToggle}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `task-label-${task.id}` }}
          disabled={isEditing}
        />
      </ListItemIcon>
      {isEditing ? (
         <TextField
             inputRef={editInputRef}
             value={editText}
             onChange={(e) => setEditText(e.target.value)}
             onKeyDown={handleKeyDown}
             variant="standard"
             fullWidth
             sx={{ my: 0.5, mr: 1 }}
             autoFocus
             onBlur={handleSave}
         />
      ) : (
        <ListItemText
          id={`task-label-${task.id}`}
          primary={task.text}
          sx={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'text.disabled' : 'text.primary',
            wordBreak: 'break-word',
            pr: 1,
            mt: 1,
            mb: 1,
          }}
        />
      )}
    </ListItem>
  );
};

export const TaskItem = memo(TaskItemComponent);