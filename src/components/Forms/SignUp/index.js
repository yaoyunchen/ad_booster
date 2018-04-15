import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.user.name,
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
      errors
    } = this.props;

    return (
      <Card className="container">
        <CardContent>
          <form action="/" onSubmit={onSubmit}>
            <h2 className="card-heading">Sign Up</h2>

            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
              <FormControl
                error={errors.name ? true : false}
                aria-describedby="name-error-text"
              >
                <InputLabel htmlFor="name">Name</InputLabel>

                <Input
                  id="name"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                />

                <FormHelperText id="name-error-text">
                  {errors.name}
                </FormHelperText>
              </FormControl>
            </div>

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
              <Button variant="raised" type="submit" color="primary">
                Create New Account
              </Button>
            </div>

            <p>
              Already have an account? <Link to={'/login'}>Log in</Link>.
          </p>
          </form>
        </CardContent>
      </Card>
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
