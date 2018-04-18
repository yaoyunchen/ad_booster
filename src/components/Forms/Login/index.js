import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.user.username,
      password: props.user.password
    };
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
    this.props.onChange(name, e.target.value);
  }

  render() {
    const {
      onSubmit,
      errors,
      successMessage
    } = this.props;

    return (
      <form action="/" onSubmit={onSubmit}>
        <Grid container justify="center">
          <Grid item xs={12}>
            {successMessage && <Typography>{successMessage}</Typography>}
            {errors.summary && <Typography color="error">{errors.summary}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <FormControl
              error={errors.username ? true : false}
              aria-describedby="username-error-text"
              style={{ width: '100%' }}
            >
              <InputLabel htmlFor="username">
                Username
              </InputLabel>

              <Input
                id="username"
                value={this.state.username}
                onChange={this.handleChange('username')}
              />

              <FormHelperText id="username-error-text">
                {errors.username}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              error={errors.password ? true : false}
              aria-describedby="password-error-text"
              style={{ width: '100%' }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>

              <Input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
              />

              <FormHelperText id="password-error-text">
                {errors.password}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="raised" type="submit" color="primary"
              style={{ display: 'block', margin: 'auto' }}
            >
              Log in
            </Button>
          </Grid>

          <Grid item xs={12} style={{ margin: '24px auto 0 auto' }}>
            <Typography align="center">
              Dont have an account? <Link to={'/signup'}>Create one</Link>.
            </Typography>
          </Grid>
        </Grid>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
