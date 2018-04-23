import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Auth from '../../../modules/Auth';
import User from '../../../modules/User';

import axiosHelper from '../../../helpers/axiosHelper';
import debugLog from '../../../utils/debug';

import AdPostForm from '../../../components/Forms/AdPost';

class AdPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adPost: {},
      errors: {},
      points: 0,
      postPoints: 100
    };
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
    const result = await User.getUserPoints();

    if (result && result.data) this.setState({ points: result.data });
  }

  decrementUserPoints = async () => {
    const { points, postPoints } = this.state;

    const result = await axiosHelper.put('/user/user', { points: (points - postPoints) });

    debugLog('Points decremented.', result);
  }

  submitAdPost = (e) => {
    e.preventDefault();

    const postCost = 100;
    if (this.state.points - postCost < 0) {
      alert('INSUFFICIENT POINTS');
      return;
    }

    axiosHelper.post('/auth/adPost', this.state.adPost)
      .then((res) => {
        if (res && res.data && !res.data.success) {
          const { errors, message } = res.data;
          errors.summary = message;

          this.setState({ errors: errors || {} });
          return;
        }

        debugLog('Ad Post created.');
        this.setState({ errors: {} });

        sessionStorage.setItem('globalMessage', res.data.message);

        this.decrementUserPoints();

        this.props.history.replace('/user');
      })
      .catch(e => {
        debugLog(e);
      });


    // let encodedFormData = '';
    // const keys = Object.keys(this.state.adPost);

    // for (let i = 0; i < keys.length; i++) {
    //   const field = this.state.adPost[keys[i]];
    //   const data = encodeURIComponent(field);

    //   if (encodedFormData === '') {
    //     encodedFormData = `${keys[i]}=${data}`;
    //   } else {
    //     encodedFormData += `&${keys[i]}=${data}`;
    //   }
    // }

    // const xhr = new XMLHttpRequest();
    // xhr.open('post', '/auth/adPost');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.responseType = 'json';

    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     // success

    //     // change the component-container state
    //     this.setState({ errors: {} });

    //     localStorage.setItem('successMessage', xhr.response.message);
    //     this.props.history.replace('/user');
    //   } else {
    //     // failure

    //     const errors = xhr.response.errors ? xhr.response.errors : {};
    //     errors.summary = xhr.response.message;

    //     this.setState({ errors });
    //   }
    // });

    // xhr.send(encodedFormData);
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

              <Divider />

              <AdPostForm
                errors={this.state.errors}
                adPost={this.state.adPost}
                onSubmit={this.submitAdPost}
                onChange={this.updateAdPost}
                points={this.state.points}
                postPoints={this.state.postPoints}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    );
  }
}

export default AdPostPage;
