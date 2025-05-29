import React, { FC, memo, useState, useRef, useEffect } from 'react';
import { ITask, PriorityLevel } from '../../types';
import { ListItem, ListItemText, Checkbox, IconButton, ListItemIcon, TextField, Box, Stack, Typography, Chip, useTheme, useMediaQuery } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { format, parseISO, isValid } from 'date-fns';

import { useTranslation } from 'react-i18next';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemProps {
  task: ITask;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  currentFilter: string;
}

const getPriorityChipColor = (priority?: PriorityLevel): ('success' | 'warning' | 'error' | 'default') => {
  switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
  }
};

const TaskItemComponent: FC<TaskItemProps> = ({ task, onToggleComplete, onDelete, onEdit, currentFilter }) => {
  const { t } = useTranslation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isAnimating, setIsAnimating] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);


  const handleToggle = () => {
    if (!task.completed && currentFilter === 'active') {
      setIsAnimating(true);
      setTimeout(() => {
        onToggleComplete(task.id);
      }, 500);
    } else {
      onToggleComplete(task.id);
    }
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

  const formatDueDate = (isoDate: string): string | null => {
    try {
        const dateObj = parseISO(isoDate);
        if (isValid(dateObj)) {
            return format(dateObj, 'PP');
        }
        return null;
    } catch (error) {
        console.error("Error parsing date:", error);
        return null;
    }
  };

  const formattedDate = task.dueDate ? formatDueDate(task.dueDate) : null;
  const chipColor = getPriorityChipColor(task.priority);

  const getPriorityDotColor = (theme: any, priority?: PriorityLevel) => {
    switch (priority) {
        case 'high': return theme.palette.error.main;
        case 'medium': return theme.palette.warning.main;
        case 'low': return theme.palette.success.main;
        default: return theme.palette.action.disabledBackground;
    }
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const conditionalListeners = isEditing ? undefined : listeners;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 10 : 'auto',
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getPriorityTranslationKey = (priority?: PriorityLevel): string => {
    if (!priority) return '';
    return `priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`;
  }

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(!isMobile ? conditionalListeners : {})}
      disablePadding
      sx={{
        ...(!isMobile ? { touchAction: 'none' } : {}),
        position: 'relative',
        backgroundColor: isDragging ? 'action.hover' : 'transparent',
        border: '1px dashed transparent',
        '&:hover': {
            borderColor: 'action.disabled',
        },
        '&.task-completing': {
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
          transform: 'translateX(100%)',
          opacity: 0,
        }
      }}
      className={isAnimating ? 'task-completing' : ''}>
      {isMobile && (
        <IconButton
            {...listeners}
            size="small"
            aria-label="Drag task handle"
            title="Drag to reorder"
            sx={{ cursor: 'grab', touchAction: 'none', mr: 0.5 }}
        >
            <DragIndicatorIcon />
        </IconButton>
      )}
      <ListItemIcon sx={{ minWidth: 0 }}>
        <Checkbox
          edge="start"
          checked={task.completed}
          onChange={handleToggle}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `task-label-${task.id}` }}
          disabled={isEditing}
          sx={{ ml: 'auto', mr: 'auto' }}
        />
      </ListItemIcon>
      <Stack direction="row" spacing={0} alignItems="center" sx={{ width: '100%' }}>
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
        <Stack sx={{ width: '100%', pr: { sm: 1 }, my: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: formattedDate ? 0.5 : 0 }}>
            <ListItemText id={`task-label-${task.id}`} primary={task.text} sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.disabled' : 'text.primary',
              wordBreak: 'break-word',
                mt: 0,
                mb: formattedDate ? 0 : 0,
              }}
            />
            {/* {isMobile ? (<Box
              component="span"
              sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: (theme) => getPriorityDotColor(theme, task.priority),
                  flexShrink: 0,
                  ml: 1
              }}
              title={`Priority: ${task.priority}`}
            />) : (
              <Chip
                    label={t(getPriorityTranslationKey(task.priority))}
                    color={chipColor}
                    size="small"
                    sx={{ ml: 1, height: '20px' }}
                    variant="outlined"
                />
            )} */}
          </Box>
          {formattedDate && (
            <Typography variant="caption" display="flex" alignItems="center" color="text.secondary" sx={{ mt: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: '0.875rem', mr: 0.5 }} />
              {formattedDate}
            </Typography>
          )}
        </Stack>
      )}
      {isMobile ? (<Box
              component="span"
              sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: (theme) => getPriorityDotColor(theme, task.priority),
                  flexShrink: 0,
                  margin: 1,
              }}
              title={`Priority: ${task.priority}`}
            />) : (
              <Chip
                    label={t(getPriorityTranslationKey(task.priority))}
                    color={chipColor}
                    size="small"
                    sx={{ margin: 1, height: '20px' }}
                    variant="outlined"
                />
            )}
      <Box sx={{ display: 'flex',  flexDirection: 'column', flexShrink: 0 }}>
        {isEditing ? (
          <>
            <IconButton size="small" aria-label="save task" onClick={handleSave} title={t('taskActions.save')}>
              <CheckIcon />
            </IconButton>
            <IconButton size="small" aria-label="cancel editing" onClick={handleCancel} title={t('taskActions.cancel')}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton size="small" aria-label="edit task" onClick={handleEditClick} title={t('taskActions.edit')}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" aria-label="delete task" onClick={handleDelete} title={t('taskActions.delete')}>
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )}
        </Box>
      </Stack>
    </ListItem>
  );
};

export const TaskItem = memo(TaskItemComponent);