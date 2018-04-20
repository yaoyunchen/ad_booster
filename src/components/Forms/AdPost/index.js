import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import {
  buildTextInput,
  buildTextAreaInput,
  buildRadioGroup,
  buildSelect
} from '../../../helpers/formHelper';

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

  render() {
    const { adPost, errors, onChange, onSubmit } = this.props;

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
            {buildTextInput(content.form.title, { data: adPost, errors, onChange })}
          </Grid>

          <Grid item xs={12} lg={10}>
            {buildTextInput(content.form.subtitle, { data: adPost, errors, onChange })}
          </Grid>

          <Grid item xs={12} lg={10} style={{ marginBottom: 16 }}>
            {buildTextAreaInput(content.form.desc, { data: adPost, errors, onChange })}
          </Grid>

          <Grid item xs={12} lg={10}>
            <Grid container spacing={16}>
              <Grid item xs={12} lg={8}>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={12} md={4} lg={6}>
                    {buildRadioGroup(content.form.availability, { data: adPost, errors, onChange })}
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    {buildTextInput(content.form.rate, { data: adPost, errors, onChange })}
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    {buildTextInput(content.form.age, { data: adPost, errors, onChange })}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={6}>
                    {buildSelect(content.form.gender, { data: adPost, errors, onChange })}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {}
                    {buildSelect(content.form.ethnicity, { data: adPost, errors, onChange })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={10}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={12} sm={6}>
                {buildSelect(content.form.province, { data: adPost, errors, onChange })}
              </Grid>

              <Grid item xs={12} sm={6}>
                {buildSelect(regionInput, { data: adPost, errors, onChange })}
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
              disabled={this.props.points - this.props.postCost < 0}
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
