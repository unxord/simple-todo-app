import React, { FC, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, TextField, Button, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

interface IFormData {
  taskText: string;
}

interface AddTaskFormProps {
  onAddTask: (text: string, dueDate: string | null) => void;
}

export const AddTaskForm: FC<AddTaskFormProps> = ({ onAddTask }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: { taskText: '' } });

  const [dueDate, setDueDate] = useState<Date | null>(null);

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    const formattedDueDate = dueDate ? format(dueDate, 'yyyy-MM-dd') : null;
    onAddTask(data.taskText.trim(), formattedDueDate);
    reset();
    setDueDate(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={1.5} direction={{ xs: 'column', sm: 'row' }} alignItems="flex-start">
        <Controller
          name="taskText"
          control={control}
          rules={{ required: 'Task text cannot be empty' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="New Task"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.taskText}
              helperText={errors.taskText?.message}
            />
          )}
        />

        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          minDate={new Date()}
          slotProps={{
              textField: {
                  size: 'small',
                  variant: 'outlined',
                  sx: { minWidth: { xs: '100%', sm: '180px' } }
              }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ flexShrink: 0, alignSelf: {xs: 'stretch', sm: 'flex-start'}}}
          startIcon={<AddCircleOutlineIcon />}
          aria-label="Add task"
        >
        </Button>
      </Stack>
    </Box>
  );
};