import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import debugLog from '../utils/debug';
import UserModule from '../modules/userModule';
import { buildFormData } from '../helpers/formHelper';

import SignUpForm from '../components/Forms/signUp';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '', username: '', password: ''
      }
    };
  }

  setErrors = (data) => {
    const { errors } = data;
    errors.summary = data.message;
    this.setState({ errors });
  }

  processForm = async (e) => {
    e.preventDefault();

    try {
      const formData = buildFormData(this.state.user);
      const result = await UserModule.postUser(formData);
      if (!result.success) {
        debugLog('processForm errors:', result);
        this.setErrors(result);
        return;
      }

        this.setState({ errors: {} });

        localStorage.setItem('successMessage', result.message);

        this.props.history.replace('/login');
    } catch (e) {
      debugLog('processForm failed:', e);
    }
  }

  changeUser = (field, value) => {
    const user = this.state.user;
    user[field] = value;
    this.setState({ user });
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Typography variant="display1" align="center" color="primary" style={{ margin: '16px 0' }}>
                Sign Up
              </Typography>

              <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default SignUpPage;
