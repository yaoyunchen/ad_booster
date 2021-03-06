import React from 'react';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormControlLabel, FormLabel, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';

const buildTextInput = (input, props) => {
  const { data, errors, onChange } = props;
  const {
    field, title, type, adornment, shrink
  } = input;

  const startAdornment = adornment ? (
    <InputAdornment position="start">{adornment}</InputAdornment>
  ) : '';

  return (
    <FormControl
      error={errors[field] ? true : false}
      aria-describedby={`${field}-error`}
      fullWidth
    >
      {
        shrink ? (
          <InputLabel shrink htmlFor={field}>{title}</InputLabel>
        ) : (
            <InputLabel htmlFor={field}>{title}</InputLabel>
          )
      }

      <Input
        id={field}
        value={data[field] || ''}
        startAdornment={startAdornment}
        type={type || ''}
        onChange={e => onChange(field, e.target.value)}
      />

      <FormHelperText id={`${field}-error`}>
        {errors[field]}
      </FormHelperText>
    </FormControl>
  );
};

const buildTextAreaInput = (input, props) => {
  const { data, errors, onChange } = props;
  const { field, title } = input;

  return (
    <FormControl
      error={errors[field] ? true : false}
      aria-describedby={`${field}-error`}
      fullWidth
    >
      <TextField
        id={field}
        label={title}
        multiline
        rows="5"
        value={data[field] || ''}
        onChange={e => onChange(field, e.target.value)}
      />

      <FormHelperText id={`${field}-error`}>
        {errors[field]}
      </FormHelperText>
    </FormControl>
  );
};

const buildRadioGroup = (input, props) => {
  const { data, errors, onChange } = props;
  const { field, title, options } = input;

  return (
    <FormControl
      error={errors[field] ? true : false}
      aria-describedby={`${field}-error`}
      fullWidth
    >
      <FormLabel>{title}</FormLabel>

      <RadioGroup
        aria-label={field}
        name={field}
        value={data[field] || ''}
        onChange={e => onChange(field, e.target.value)}
        style={{ flexDirection: 'row' }}
      >
        {
          options.map((option) => {
            return (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio color="primary" />}
                label={option.text}
              />
            );
          })
        }
      </RadioGroup>

      <FormHelperText id={`${field}-error`}>
        {errors[field]}
      </FormHelperText>
    </FormControl>
  );
};

const buildSelect = (input, props) => {
  const { data, errors, onChange } = props;
  const { field, title, options, shrink } = input;

  return (
    <FormControl
      error={errors[field] ? true : false}
      aria-describedby={`${field}-error`}
      fullWidth
      disabled={options.length === 0}
    >
      {shrink ? (
        <InputLabel shrink htmlFor={field}>{title}</InputLabel>
      ) : (
          <InputLabel shrink htmlFor={field}>{title}</InputLabel>
        )}

      <Select
        id={field}
        value={data[field] || ''}
        inputProps={{ name: field, id: field }}
        onChange={e => onChange(field, e.target.value)}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.text}
            </MenuItem>
          );
        })}
      </Select>

      <FormHelperText id={`${field}-error`}>
        {errors[field]}
      </FormHelperText>
    </FormControl>
  );
};

const buildFormData = data => {
  const formData = new FormData();

  Object.keys(data).forEach((key, i) => formData.append(key, data[key]));

  return formData;
};

export {
  buildRadioGroup,
  buildSelect,
  buildTextInput,
  buildTextAreaInput,
  buildFormData
};
