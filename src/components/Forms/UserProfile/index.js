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

const content = {
  form: {
    submit: 'Save'
  }
};

class UserProfileForm extends React.Component {
  render() {
    const { user, errors, onSubmit } = this.props;

    return (
      <form action="/" onSubmit={onSubmit}>
        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            {errors.summary && (
              <Typography color="error">{errors.summary}</Typography>
            )}
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
  }
}

UserProfileForm.propTypes = {
  adPost: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

UserProfileForm.defaultProps = {
  adPost: {},
  errors: {},
  onChange: () => { },
  onSubmit: () => { }
};

export default UserProfileForm;
