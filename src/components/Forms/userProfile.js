import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
// import { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import {
  buildTextInput
} from '../../helpers/formHelper';

const content = {
  form: {
    submit: 'Save',
    // firstname: {
    //   field: 'firstname',
    //   title: 'First Name'
    // },
    // middlename: {
    //   field: 'middlename',
    //   title: 'Middle Name'
    // },
    // lastname: {
    //   field: 'lastname',
    //   title: 'Last Name'
    // },
    // photo: {
    //   field: 'photo',
    //   title: 'Profile Picture'
    // },
    phone: {
      field: 'phone',
      title: 'Phone Number'
    },
    email: {
      field: 'email',
      title: 'Email'
    }
  }
};


class UserProfileForm extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { imagePreviewUrl: '' };
  // }

  // handleImageChange = (e) => {
  //   e.preventDefault();

  //   const reader = new FileReader();
  //   const file = e.target.files[0];

  //   reader.onloadend = () => {
  //     this.setState({
  //       imagePreviewUrl: reader.result
  //     });
  //   };

  //   reader.readAsDataURL(file);
  //   this.props.onChange('photo', e.target.files);
  // }

  render() {
    const { user, errors, onChange, onSubmit } = this.props;

    // const imagePreviewElement = this.state.imagePreviewUrl ? (
    //   <img
    //     src={this.state.imagePreviewUrl}
    //     alt="User pic"
    //     style={{ width: '100%' }}
    //   />
    // ) : (
    //   <Typography>Please Upload an Image</Typography>
    // );

    return (
      <form action="/" onSubmit={onSubmit}>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} sm={10} lg={8}>
            {errors.summary && (
              <Typography color="error" style={{ margin: 'auto' }}>{errors.summary}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={10} lg={8}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Grid container justify="flex-start">
                  {/*
                    <Grid item xs={9} md={8}>
                      {buildTextInput(content.form.firstname, { data: user, errors, onChange })}
                    </Grid>

                    <Grid item xs={9} md={8}>
                      {buildTextInput(content.form.middlename, { data: user, errors, onChange })}
                    </Grid>

                    <Grid item xs={9} md={8}>
                      {buildTextInput(content.form.lastname, { data: user, errors, onChange })}
                    </Grid>

                    <Grid item xs={9} md={8}>
                      {buildTextInput(content.form.phone, { data: user, errors, onChange })}
                    </Grid>
                  */}


                  <Grid item xs={9} md={8}>
                    {buildTextInput(content.form.email, { data: user, errors, onChange })}
                  </Grid>
                </Grid>
              </Grid>

              {/*
                <Grid item xs={12} sm={6}>
                  <InputLabel shrink htmlFor="photo" style={{ position: 'static', width: '100%' }}>
                    Profile Picture
                  </InputLabel>

                  <input
                    id="photo" type="file" accept="image/*"
                    style={{ margin: '16px 0' }}
                    onChange={(e) => this.handleImageChange(e)}
                  />

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 240,
                      width: 240,
                      borderLeft: '1px solid gray',
                      borderRight: '1px solid gray',
                      borderTop: '5px solid gray',
                      borderBottom: '5px solid gray',
                      overflow: 'hidden'
                    }}
                    onClick={() => document.getElementById('photo').click() }
                  >
                    {imagePreviewElement}
                  </div>
                </Grid>
              */}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={10} lg={8}>
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
  }
}

UserProfileForm.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

UserProfileForm.defaultProps = {
  user: {},
  errors: {},
  onChange: () => { },
  onSubmit: () => { }
};

export default UserProfileForm;
