import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface IFormData {
  taskText: string;
}

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

export const AddTaskForm: FC<AddTaskFormProps> = ({ onAddTask }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      taskText: '',
    },
  });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    onAddTask(data.taskText.trim());
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        mb: 2,
      }}
    >
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
            autoFocus
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ flexShrink: 0 }}
        startIcon={<AddCircleOutlineIcon />}
        aria-label="Add task"
      >
      </Button>
    </Box>
  );
};