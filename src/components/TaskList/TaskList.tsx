import React, { FC } from 'react';
import { ITask } from '../../types';
import { TaskItem } from '../TaskItem/TaskItem';
import { List, Box, Typography, Divider, Button } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { FilterValue } from '../../types';

interface TaskListProps {
  tasks: ITask[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  title?: string;
  currentFilter: FilterValue;
  onDeleteAll: (filter: FilterValue) => void;
}

export const TaskList: FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  currentFilter,
  onDeleteAll,
}) => {
  const { t } = useTranslation();
  const title = t('taskList.title');
  const taskIds = tasks.map(task => task.id);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {title && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={() => onDeleteAll(currentFilter)}
            size="small"
          >
            {t('deleteAll')}
          </Button>
        </Box>
      )}

      {tasks.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          {t('taskList.empty')}
        </Typography>
      ) : (
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <List disablePadding>
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <TaskItem
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  currentFilter={currentFilter}
                />
                {index < tasks.length - 1 && <Divider component="li" variant="inset" />}
              </React.Fragment>
            ))}
          </List>
        </SortableContext>
      )}
    </Box>
  );
};