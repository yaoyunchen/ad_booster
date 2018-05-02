import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Auth from '../../modules/authModule';
import UserModule from '../../modules/userModule';
import AdPostModule from '../../modules/adPostModule';

import debugLog from '../../utils/debug';

import AdPostForm from '../../components/Forms/AdPost';

class AdPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adPost: {},
      errors: {},
      points: 0,
      plan: {
        name: 'std_post_adpost',
        price: 5
      }
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
    const { data } = result;

    if (data && data.data) {
      this.setState({ points: data.data.points });
    }
  }

  checkSufficientPoints = () => {
    const { plan, points } = this.state;

    if (points - plan.price < 0) {
      alert('INSUFFICIENT POINTS');
      return false;
    }

    return true;
  }

  buildFormData = () => {
    const formData = new FormData();
    const { adPost, plan } = this.state;
    const keys = Object.keys(adPost);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = adPost[key];

      if (key === 'photos') {
        for (let j = 0; j < value.length; j++) {
          formData.append(`${key}[${j}]`, value[j].file, value[j].file.name);
        }
      } else {
        formData.append(key, value);
      }
    }
    formData.append('requesterId', Auth.getToken());
    formData.append('planName', plan.name);

    return formData;
  }

  submitAdPost = async (e) => {
    e.preventDefault();

    // Handle saving instead of posting.
    if (!this.checkSufficientPoints()) return;

    try {
      const formData = this.buildFormData();
      const result = await AdPostModule.postAdPost(formData);
      const { data } = result;

      if (!data.success) {
        debugLog('submitAdPost Error: ', result);
        return;
      }

      debugLog('submitAdPost: ', 'AdPost created');
      this.props.history.replace('/user');
    } catch (e) {
      debugLog('submitAdPost: Error: Unable to post ad', e);
    }
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
                state="new"
                errors={this.state.errors}
                adPost={this.state.adPost}
                onSubmit={this.submitAdPost}
                onChange={this.updateAdPost}
                points={this.state.points}
                price={this.state.plan.price}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default AdPostPage;
