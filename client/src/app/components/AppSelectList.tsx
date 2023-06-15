import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  items: string[];
}

const AppSelectList = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select value={field.value} label={props.label} onChange={field.onChange}>
        {props.items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AppSelectList;
