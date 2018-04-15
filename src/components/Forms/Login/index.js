import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.user.email,
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
      <Card className="container" raised>
        <CardHeader title="Log In" />

        <CardContent>
          <form action="/" onSubmit={onSubmit}>

            {successMessage && <Typography color="primary">{successMessage}</Typography>}

            {errors.summary && <Typography color="error">{errors.summary}</Typography>}

            <div className="field-line">
              <FormControl
                error={errors.email ? true : false}
                aria-describedby="email-error-text"
              >
                <InputLabel htmlFor="email">Email</InputLabel>

                <Input
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                />

                <FormHelperText id="email-error-text">
                  {errors.email}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="field-line">
              <FormControl
                error={errors.password ? true : false}
                aria-describedby="password-error-text"
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
            </div>

            <div className="button-line">
              <Button variant="raised" type="submit" label="" color="primary">
                Log in
            </Button>
            </div>

            <Typography>
              Dont have an account? <Link to={'/signup'}>Create one</Link>.
            </Typography>
          </form>
        </CardContent>
      </Card>
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
