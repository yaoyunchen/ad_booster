import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    const { user } = props;
    this.state = {
      username: user.username,
      email: user.email,
      password: user.password
    };
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
    this.props.onChange(name, e.target.value);
  }

  render() {
    const {
      onSubmit,
      errors
    } = this.props;

    return (
      <form action="/" onSubmit={onSubmit}>
        <Grid container justify="center">
          <Grid item xs={12}>
            {errors.summary && <Typography color="error">{errors.summary}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <FormControl
              error={errors.username ? true : false}
              aria-describedby="username-error-text"
              style={{ width: '100%' }}
            >
              <InputLabel htmlFor="username">
                User Name
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
              error={errors.email ? true : false}
              aria-describedby="email-error-text"
              style={{ width: '100%' }}
            >
              <InputLabel htmlFor="email">
                Email
              </InputLabel>

              <Input
                id="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />

              <FormHelperText id="email-error-text">
                {errors.email}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              error={errors.password ? true : false}
              aria-describedby="password-error-text"
              style={{ width: '100%' }}
            >
              <InputLabel htmlFor="password">
                Password
            </InputLabel>

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
              Create New Account
            </Button>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 24 }}>
            <Typography align="center">
              Already have an account? <Link to={'/login'}>Log in</Link>.
            </Typography>
          </Grid>
        </Grid>
      </form>
    );
  }
}


SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
