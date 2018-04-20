import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Auth from '../../modules/Auth';
import AdPostForm from '../../components/Forms/AdPost';

import User from '../../modules/User';

class AdPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { adPost: {}, errors: {}, points: 0 };
  }

  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      // Redirect to homepage if user is not authenticated.
      this.props.history.replace({ pathname: '/' });
    }
  }

  componentDidMount() {
    this.getUserPoints();
  }

  getUserPoints = async () => {
    const points = await User.getUserPoints();
    this.setState({ points });
  }

  submitAdPost = (e) => {
    e.preventDefault();

    this.getUserPoints();
    const postCost = 100;
    if (this.state.points - postCost < 0) {
      alert('INSUFFICIENT POINTS');
      return;
    }

    let encodedFormData = '';
    const keys = Object.keys(this.state.adPost);

    for (let i = 0; i < keys.length; i++) {
      const field = this.state.adPost[keys[i]];
      const data = encodeURIComponent(field);

      if (encodedFormData === '') {
        encodedFormData = `${keys[i]}=${data}`;
      } else {
        encodedFormData += `&${keys[i]}=${data}`;
      }
    }

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/adPost');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({ errors: {} });

        localStorage.setItem('successMessage', xhr.response.message);
        this.props.history.replace('/user');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({ errors });
      }
    });

    xhr.send(encodedFormData);
  }

  updateAdPost = (field, value) => {
    const { adPost } = this.state;
    adPost[field] = value;
    this.setState({ adPost });
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Typography variant="display1" align="center" color="primary" style={{ margin: '16px 0' }}>
                Post an Ad
              </Typography>

              <AdPostForm
                errors={this.state.errors}
                adPost={this.state.adPost}
                onSubmit={this.submitAdPost}
                onChange={this.updateAdPost}
                points={this.state.points}
                postCost={100}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    );
  }
}

export default AdPostPage;
