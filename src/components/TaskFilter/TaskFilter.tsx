import React, { FC } from 'react';
import { FilterValue } from '../../types';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

interface TaskFilterProps {
  currentFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const TaskFilter: FC<TaskFilterProps> = ({ currentFilter, onFilterChange }) => {

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: FilterValue | null,
  ) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <ToggleButtonGroup
        value={currentFilter}
        exclusive
        onChange={handleFilterChange}
        aria-label="task filter"
      >
        <ToggleButton value="all" aria-label="show all tasks">
          All
        </ToggleButton>
        <ToggleButton value="active" aria-label="show active tasks">
          Active
        </ToggleButton>
        <ToggleButton value="completed" aria-label="show completed tasks">
          Completed
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};