import React, { FC, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { PriorityLevel } from '../../types';
import { useTranslation } from 'react-i18next';

interface IFormData {
  taskText: string;
}

interface AddTaskFormProps {
  onAddTask: (text: string, dueDate: string | null, priority: PriorityLevel) => void;
}

const priorityLevels: PriorityLevel[] = ['low', 'medium', 'high'];

export const AddTaskForm: FC<AddTaskFormProps> = ({ onAddTask }) => {

  const { t } = useTranslation()

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: { taskText: '' } });

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<PriorityLevel>('medium');

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    const formattedDueDate = dueDate ? format(dueDate, 'yyyy-MM-dd') : null;
    onAddTask(data.taskText.trim(), formattedDueDate, priority);
    reset();
    setDueDate(null);
    setPriority('medium');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={1.5} direction={{ xs: 'column', sm: 'row' }} alignItems="flex-start" sx={{mb: 2}}>
        <Controller
          name="taskText"
          control={control}
          rules={{ required: t('validation.taskTextRequired') }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('addTaskLabel')}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.taskText}
              helperText={errors.taskText?.message}
            />
          )}
        />

        <DatePicker
          label={t('dueDateLabel')}
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

        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 120 } }}>
          <InputLabel id="priority-select-label">{t('priority')}</InputLabel>
          <Select labelId="priority-select-label" id="priority-select" value={priority} label={t('priority')} onChange={(e) => setPriority(e.target.value as PriorityLevel)}>
              {priorityLevels.map((level) => (
                <MenuItem key={level} value={level}>
                    {t(`priority${level.charAt(0).toUpperCase() + level.slice(1)}` as any)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ flexShrink: 0, alignSelf: {xs: 'stretch', sm: 'flex-start'}, '& .MuiButton-startIcon': { margin: 0 }}}
          startIcon={<AddCircleOutlineIcon />}
          aria-label={t('addTaskButton')}
        >
        </Button>
      </Stack>
    </Box>
  );
};