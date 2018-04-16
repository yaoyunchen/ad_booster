import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    const { user } = props;
    this.state = {
      firstname: user.firstname,
      lastname: user.lastname,
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
      <Card className="container" raised>
        <CardHeader title="Sign Up "/>

        <CardContent>
          <form action="/" onSubmit={onSubmit}>
            {errors.summary && <Typography color="error">{errors.summary}</Typography>}

            <div className="field-line">
              <FormControl
                error={errors.firstname ? true : false}
                aria-describedby="firstname-error-text"
                style={{ minWidth: 240 }}
              >
                <InputLabel htmlFor="firstname">
                  First Name
                </InputLabel>

                <Input
                  id="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange('firstname')}
                />

                <FormHelperText id="firstname-error-text">
                  {errors.firstname}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="field-line">
              <FormControl
                error={errors.lastname ? true : false}
                aria-describedby="lastname-error-text"
                style={{ minWidth: 240 }}
              >
                <InputLabel htmlFor="lastname">
                  Last Name
                </InputLabel>

                <Input
                  id="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange('lastname')}
                />

                <FormHelperText id="lastname-error-text">
                  {errors.lastname}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="field-line">
              <FormControl
                error={errors.username ? true : false}
                aria-describedby="username-error-text"
                style={{ minWidth: 240 }}
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
            </div>

            <div className="field-line">
              <FormControl
                error={errors.email ? true : false}
                aria-describedby="email-error-text"
                style={{ minWidth: 240 }}
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
            </div>

            <div className="field-line">
              <FormControl
                error={errors.password ? true : false}
                aria-describedby="password-error-text"
                style={{ minWidth: 240 }}
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
            </div>

            <div className="button-line">
              <Button variant="raised" type="submit" color="primary">
                Create New Account
              </Button>
            </div>

            <Typography>
              Already have an account? <Link to={'/login'}>Log in</Link>.
            </Typography>
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
