import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { FormControl, FormControlLabel, FormLabel, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import { InputLabel } from 'material-ui/Input';
import Typography from 'material-ui/Typography';

import {
  buildTextInput,
  buildTextAreaInput,
  buildRadioGroup,
  buildSelect
} from '../../../helpers/formHelper';

import { convertReadableNum } from '../../../helpers/contentHelper';

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

import './styles.scss';

const content = {
  title: 'Post an Ad',
  form: {
    submit: 'Submit',
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
        { text: 'Both', value: 'both' }
      ]
    },
    // rate: {
    //   field: 'rate',
    //   title: 'Rate per Hour',
    //   shrink: true,
    //   type: 'number',
    //   adornment: '$'
    // },
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
  constructor(props) {
    super(props);

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

    this.state = {
      photoPreviewUrls: [],
      photoError: '',
      selectedPhoto: ''
    };
  }

  handlePhotosChange = e => {
    e.preventDefault();

    const files = e.target.files;
    if (files.length === 0) return;

    // TODO: Validate this in back end too.
    if (files.length > 10) {
      this.setState({
        photoPreviewUrls: [],
        photoError: 'Maximum 10 images allowed.'
      });

      e.target.value = '';
      return;
    }

    // TODO: Make sure to validate this in back end too.
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 1MB ~ 1048576
      if (file.size > 10485760) {
        this.setState({
          photoPreviewUrls: [],
          photoError: 'Images must be smaller than 10MB.'
        });

        e.target.value = '';
        return;
      }
    }


    this.setState({ photoPreviewUrls: [], photoError: '' });

    [].forEach.call(files, this.readFile);
    this.props.onChange('photos', e.target.files);
  }

  readFile = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const photos = this.state.photoPreviewUrls;
      photos.push({ name: file.name, url: reader.result });
      this.setState({ photoPreviewUrls: photos });
    };

    reader.readAsDataURL(file);
  }

  onPreviewContainerClick = (e) => {
    this.setState({
      selectedPhoto: e.target.alt || e.target.children[0].alt
    });
  }

  buildPhotoPreview = () => {
    const { photoPreviewUrls, selectedPhoto } = this.state;

    if (photoPreviewUrls.length === 0) {
      return (
        <Typography
          align="center" className="photos__display--empty"
          onClick={() => document.querySelector('.photos__input').click()}
        >
          Select image(s) to upload
        </Typography>
      );
    }

    return photoPreviewUrls.map((photo) => {
      return (
        <div
          key={photo.name}
          className={`photos__display--image-container ${selectedPhoto === photo.name ? 'photos__display--active-image' : ''}`}
          onClick={this.onPreviewContainerClick.bind(this)}
        >
          <img
            className="photos__display--image"
            src={photo.url} alt={photo.name}
          />
        </div>
      );
    });
  }

  shiftPhotoLeft = () => {
    const { photoPreviewUrls, selectedPhoto } = this.state;

    const tempArr = photoPreviewUrls;

    for (let i = 0; i < photoPreviewUrls.length; i++) {
      const photo = photoPreviewUrls[i];

      if (photo.name === selectedPhoto) {
        if (i === 0) return;

        const temp = tempArr[i - 1];
        tempArr[i - 1] = photo;
        tempArr[i] = temp;

        this.setState({ photoPreviewUrls: tempArr }, () => {
          document.querySelector('.photos__display--active-image').scrollIntoView();
        });

        return;
      }
    }
  }

  shiftPhotoRight = () => {
    const { photoPreviewUrls, selectedPhoto } = this.state;

    const tempArr = photoPreviewUrls;

    for (let i = 0; i < photoPreviewUrls.length; i++) {
      const photo = photoPreviewUrls[i];

      if (photo.name === selectedPhoto) {
        if (i === photoPreviewUrls.length - 1) return;

        const temp = tempArr[i + 1];
        tempArr[i + 1] = photo;
        tempArr[i] = temp;

        this.setState({ photoPreviewUrls: tempArr }, () => {
          document.querySelector('.photos__display--active-image').scrollIntoView();
        });

        return;
      }
    }
  }


  buildPhotoUploads = () => {
    const { errors } = this.props;
    const { photoPreviewUrls, photoError, selectedPhoto } = this.state;

    const photoPreviewEle = this.buildPhotoPreview();

    return (
      <FormControl
        error={errors.photos || photoError ? true : false}
        aria-describedby="photos-error"
        style={{ margin: '16px 0', width: '100%' }}
      >
        <InputLabel shrink htmlFor="photos"
          style={{ display: 'block', width: '100%' }}
        >
          Upload Photos
        </InputLabel>

        <input
          className="photos__input"
          id="photos" type="file" accept="image/*" multiple
          onChange={e => this.handlePhotosChange(e)}
        />

        <div className="photos__display">
          {photoPreviewEle}
        </div>

        {photoPreviewUrls.length > 0 ? (
          <div className="photos__controls">
            <Button
              variant="raised" disabled={selectedPhoto ? false : true}
              onClick={() => this.shiftPhotoLeft()}
            >
              <Icon style={{ fontSize: 20 }}>
                keyboard_arrow_left
              </Icon>
            </Button>

            <Button
              variant="raised" disabled={selectedPhoto ? false : true}
              onClick={() => this.shiftPhotoRight()}
            >
              <Icon style={{ fontSize: 20 }}>
                keyboard_arrow_right
              </Icon>
            </Button>
          </div>
        ) : ''}

        {
          errors.photos || photoError ? (
            <FormHelperText id="photos-error">
              {errors.pbotos || photoError}
            </FormHelperText>
          ) : ''
        }
      </FormControl>
    );
  }

  buildPricingElement = () => {
    const { points, postPoints } = this.props;

    return (
      <div>
        <Typography
          variant="caption" align="right"
          style={{ margin: '8px 0' }}
        >
          Current Points: {convertReadableNum(points)}
        </Typography>

        <Typography
          variant="caption" align="right"
          style={{ marginBottom: 8 }}
        >
          Post Cost: {postPoints}
        </Typography>

        <Typography
          variant="caption" align="right"
          style={{ marginBottom: 8 }}
        >
          {
            this.props.points - this.props.postPoints >= 0 ? `
                  Remaining Points: ${convertReadableNum(points - postPoints)}
                ` : 'Insuffifient points to post'
          }
        </Typography>
      </div>
    );
  }

  render() {
    const {
      adPost,
      errors,
      points,
      postPoints,
      onChange,
      onSubmit
    } = this.props;
    const { region, province } = content.form;

    let regionInput = region;

    if (adPost.province) {
      const selectedProvince = province.options.filter(province => province.value === adPost.province);

      regionInput = selectedProvince[0].regions;
    }

    const photoUploadElement = this.buildPhotoUploads();
    const pricingElement = this.buildPricingElement();


    return (
      <form action="/" onSubmit={onSubmit}>
        <Grid container justify="center">
          {/* Error summary */}
          <Grid item xs={12} sm={10} lg={8}>
            {errors.summary && (
              <Typography color="error">{errors.summary}</Typography>
            )}
          </Grid>

          {/* Title */}
          <Grid item xs={12} sm={10} lg={8}>
            {buildTextInput(content.form.title, { data: adPost, errors, onChange })}
          </Grid>

          {/* Subtitle */}
          <Grid item xs={12} sm={10} lg={8}>
            {buildTextInput(content.form.subtitle, { data: adPost, errors, onChange })}
          </Grid>

          {/* Desc */}
          <Grid item xs={12} sm={10} lg={8} style={{ marginBottom: 16 }}>
            {buildTextAreaInput(content.form.desc, { data: adPost, errors, onChange })}
          </Grid>

          {/* Availability, Age */}
          <Grid item xs={12} sm={10} lg={8}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={12} sm={6} md={4}>
                {buildRadioGroup(content.form.availability, { data: adPost, errors, onChange })}
              </Grid>

              <Hidden smDown>
                <Grid item md={1}></Grid>
              </Hidden>

              <Grid item xs={12} sm={6} md={4}>
                {buildTextInput(content.form.age, { data: adPost, errors, onChange })}
              </Grid>
            </Grid>
          </Grid>

          {/* Gender, Ethnicity, Province, Region */}
          <Grid item xs={12} sm={10} lg={8}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={12} sm={6} md={4}>
                {buildSelect(content.form.gender, { data: adPost, errors, onChange })}
              </Grid>

              <Hidden smDown>
                <Grid item md={1}></Grid>
              </Hidden>

              <Grid item xs={12} sm={6} md={4}>
                {buildSelect(content.form.ethnicity, { data: adPost, errors, onChange })}
              </Grid>
            </Grid>

            <Grid container spacing={16} justify="center">
              <Grid item xs={12} sm={6} md={4}>
                {buildSelect(content.form.province, { data: adPost, errors, onChange })}
              </Grid>

              <Hidden smDown>
                <Grid item md={1}></Grid>
              </Hidden>

              <Grid item xs={12} sm={6} md={4}>
                {buildSelect(regionInput, { data: adPost, errors, onChange })}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={10} lg={8}><Divider /></Grid>

          {/* Photos */}
          <Grid item xs={12} sm={10} lg={8}>
            {photoUploadElement}
          </Grid>

          <Grid item xs={12} sm={10} lg={8}><Divider /></Grid>

          {/* Price Calculation */}
          {
            this.props.price ? (
              <Grid item xs={12} sm={10} lg={8}>
                {pricingElement}
              </Grid>
            ) : ''
          }

          <Grid item xs={12} sm={10} lg={8}><Divider /></Grid>

          <Grid item xs={12} sm={10} lg={8}>
            <Button
              variant="raised" type="submit" color="primary"
              disabled={points && points - postPoints < 0 ? true : false}
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
  points: PropTypes.number,
  postPoints: PropTypes.number,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

AdPostForm.defaultProps = {
  adPost: {},
  errors: {},
  points: 0,
  postPoints: 100,
  onChange: () => { },
  onSubmit: () => { }
};

export default AdPostForm;
