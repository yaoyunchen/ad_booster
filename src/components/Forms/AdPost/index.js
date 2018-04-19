import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormControlLabel, FormLabel, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const content = {
  title: 'Post an Ad',
  form: {
    submit: 'Post an Ad',
    title: {
      field: 'title',
      title: 'Title',
    },
    subtitle: {
      field: 'subtitle',
      title: 'Subtitle'
    },
    desc: {
      field: 'desc',
      title: 'Description'
    },
    availability: {
      field: 'availability',
      title: 'Availability',
      options: [
        { text: 'In', value: 'in', },
        { text: 'Out', value: 'out' },
        { text: 'Any', value: 'any' }
      ]
    },
    rate: {
      field: 'rate',
      title: 'Rate per Hour',
      shrink: true,
      type: 'number',
      adornment: '$'
    },
    age: {
      field: 'age',
      title: 'Age',
      type: 'number',
      shrink: true
    },
    gender: {
      field: 'gender',
      title: 'Gender',
      shrink: true,
      options: [
        { text: 'Male', value: 'male', },
        { text: 'Female', value: 'female' },
        { text: 'Transgender', value: 'transgender' },
        { text: 'Other', value: 'other' }
      ]
    },
    ethnicity: {
      field: 'ethnicity',
      title: 'Ethnicity',
      shrink: true,
      options: [
        { text: 'Asian', value: 'asian', },
        { text: 'Caucasian', value: 'caucasian' },
        { text: 'Black', value: 'black' },
        { text: 'Other', value: 'other' }
      ]
    },
    province: {
      field: 'province',
      title: 'Province',
      shrink: true,
      options: [
        {
          text: 'Alberta', value: 'AB', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'British Columbia', value: 'BC', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: [
              { text: 'Vancouver', value: 'vancouver' },
              { text: 'Richmond', value: 'richmond' },
              { text: 'Burnaby', value: 'burnaby' }
            ]
          }
        },
        {
          text: 'Manitoba', value: 'MB', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'New Brunswick', value: 'NB', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Newfoundland and Labrador', value: 'NL', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Nova Scotia', value: 'NS', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Northwest Territories', value: 'NT', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Nunavut', value: 'NU', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Ontario', value: 'ON', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Prince Edward Island', value: 'PE', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Quebec', value: 'QC', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Saskatchewan', value: 'SK', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        },
        {
          text: 'Yukon', value: 'YT', regions: {
            field: 'region',
            title: 'Region',
            shrink: true,
            options: []
          }
        }
      ]
    },
    region: {
      field: 'region',
      title: 'Region',
      shrink: true,
      options: []
    }
  }
};

class AdPostForm extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.toolbarModule = {
  //     toolbar: [
  //       [{ 'font': [] }],
  //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //       ['bold', 'italic', 'underline', 'strike'],
  //       ['blockquote', 'code-block'],
  //       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //       [{ 'script': 'sub' }, { 'script': 'super' }],
  //       [{ 'indent': '-1' }, { 'indent': '+1' }],
  //       [{ 'direction': 'rtl' }],
  //       [{ 'color': [] }, { 'background': [] }],
  //       [{ 'align': [] }],
  //       ['clean'],
  //       ['link', 'image', 'video']
  //     ]
  //   };
  // }

  buildTextInput = (input) => {
    const { adPost, errors, onChange } = this.props;
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
          value={adPost[field] || ''}
          startAdornment={startAdornment}
          type={type || ''}
          onChange={e => onChange(field, e.target.value)}
        />

        <FormHelperText id={`${field}-error`}>
          {errors[field]}
        </FormHelperText>
      </FormControl>
    );
  }

  buildTextAreaInput = (input) => {
    const { adPost, errors, onChange } = this.props;
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
          value={adPost[field] || ''}
          onChange={e => onChange(field, e.target.value)}
        />

        {/*
          <Typography
            variant="subheading"
            style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: 16 }}
            gutterBottom
          >
            {title}
          </Typography>

          <div style={{ backgroundColor: '#fff' }}>
            <ReactQuill
              id={field}
              value={adPost[field] || ''}
              modules={this.toolbarModule}
              onChange={e => onChange(field, e)}
            >
              <div style={{ minHeight: 120 }} />
            </ReactQuill>
          </div>
        */}

        <FormHelperText id={`${field}-error`}>
          {errors[field]}
        </FormHelperText>
      </FormControl>
    );
  }

  buildRadioGroup = (input) => {
    const { adPost, errors, onChange } = this.props;
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
          value={adPost[field] || ''}
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
  }

  buildSelect = (input) => {
    const { adPost, errors, onChange } = this.props;
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
          value={adPost[field] || ''}
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
  }

  render() {
    const { adPost, errors, onSubmit } = this.props;

    const { region, province } = content.form;

    let regionInput = region;

    if (adPost.province) {
      const selectedProvince = province.options.filter(province => province.value === adPost.province);

      regionInput = selectedProvince[0].regions;
    }

    return (
      <form action="/" onSubmit={onSubmit}>
        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            {errors.summary && (
              <Typography color="error">{errors.summary}</Typography>
            )}
          </Grid>

          <Grid item xs={12} lg={10}>
            {this.buildTextInput(content.form.title)}
          </Grid>

          <Grid item xs={12} lg={10}>
            {this.buildTextInput(content.form.subtitle)}
          </Grid>

          <Grid item xs={12} lg={10} style={{ marginBottom: 16 }}>
            {this.buildTextAreaInput(content.form.desc)}
          </Grid>

          <Grid item xs={12} lg={10}>
            <Grid container spacing={16}>
              <Grid item xs={12} lg={8}>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={12} md={4} lg={6}>
                    {this.buildRadioGroup(content.form.availability)}
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    {this.buildTextInput(content.form.rate)}
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    {this.buildTextInput(content.form.age)}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={6}>
                    {this.buildSelect(content.form.gender)}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {}
                    {this.buildSelect(content.form.ethnicity)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={10}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={12} sm={6}>
                {this.buildSelect(content.form.province)}
              </Grid>

              <Grid item xs={12} sm={6}>
                {this.buildSelect(regionInput)}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={10}>
            <Typography variant="caption" align="center">
              Some price calculation here
            </Typography>
          </Grid>

          <Grid item xs={12} lg={10}>
            <Button
              variant="raised" type="submit" color="primary"
              style={{ margin: '24px auto 0 auto', display: 'block' }}
            >
              {content.form.submit}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };
}

AdPostForm.propTypes = {
  adPost: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

AdPostForm.defaultProps = {
  adPost: {},
  errors: {},
  onChange: () => {},
  onSubmit: () => {}
};

export default AdPostForm;
