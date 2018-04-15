import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

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
      <Card className="container">
        <CardContent>
          <form action="/" onSubmit={onSubmit}>
            <h2 className="card-heading">Login</h2>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errors.summary && <p className="error-message">{errors.summary}</p>}

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

            <p>Dont have an account? <Link to={'/signup'}>Create one</Link>.</p>
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
