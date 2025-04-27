import React, { FC } from 'react';
import { ITask } from '../../types';
import { TaskItem } from '../TaskItem/TaskItem';
import { List, Box, Typography, Divider } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();
  const title = t('taskList.title');
  const taskIds = tasks.map(task => task.id);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {title && (
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
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