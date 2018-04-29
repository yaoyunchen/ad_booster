import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Auth from '../../modules/Auth';
import UserModule from '../../modules/userModule';

import debugLog from '../../utils/debug';

import AdPostForm from '../../components/Forms/AdPost';

import AxiosHelper from '../../helpers/axiosHelper';

class AdPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adPost: {},
      errors: {},
      points: 0,
      price: 5
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
    const result = await UserModule.getUserPoints(Auth.getToken());
    if (result && result.data) {
      this.setState({ points: result.data.points });
    }
  }

  decrementUserPoints = async () => {
    const Axios = new AxiosHelper();

    const { points, postPoints } = this.state;

    const result = await Axios.put('/user/user', { points: (points - postPoints) });

    debugLog('Points decremented.', result);
  }


  submitAdPost = (e) => {
    e.preventDefault();

    const postCost = 100;
    if (this.state.points - postCost < 0) {
      alert('INSUFFICIENT POINTS');
      return;
    }

    const formData = new FormData();
    const keys = Object.keys(this.state.adPost);

    for (let i = 0; i < keys.length; i ++) {
      formData.append(keys[i], this.state.adPost[keys[i]]);
    }

    formData.append('requesterId', Auth.getToken());
    formData.append('planName', 'std_post_adpost');

    const Axios = new AxiosHelper();
    Axios.post('/adPost', formData, { 'Content-Type': 'multipart/form-data' })
      .then((res) => {
        if (res && res.data && res.data.data && !res.data.data.success) {
          const { errors, message } = res.data;
          errors.summary = message;

          this.setState({ errors: errors || {} });
          return;
        }

        debugLog('Ad Post created.');
        this.setState({ errors: {} });

        // sessionStorage.setItem('globalMessage', res.data.data.message);

        this.decrementUserPoints();

        this.props.history.replace('/user');
      })
      .catch(e => {
        debugLog(e);
      });
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
                price={this.state.price}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default AdPostPage;
