import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import AdPostModule from '../../../../modules/AdPost';
import Auth from '../../../../modules/Auth';

import AxiosHelper from '../../../../helpers/axiosHelper';


import debugLog from '../../../../utils/debug';

import AdPostForm from '../../../../components/Forms/AdPost';

class AdPostEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adPost: {},
      errors: {}
    };
  }

  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      // Redirect to homepage if user is not authenticated.
      this.props.history.replace({ pathname: '/' });
    }
  }

  componentDidMount() {
    this.getAdPost();
  }

  getAdPost = async () => {
    this.startLoading();
    let id = '';

    try {
      id = this.props.match.params.id;
    } catch (e) {
      debugLog('Unable to get id param');
    }

    const AdPost = new AdPostModule();
    const result = await AdPost.getAdPost(id);

    debugLog('Ad Post loaded: ', result);
    if (result && result.data) this.setState({ adPost: result.data });

    this.endLoading();
  }

  submitAdPost = (e) => {
  }

  updateAdPost = (field, value) => {
    const { adPost } = this.state;
    adPost[field] = value;
    this.setState({ adPost });
  }

  startLoading = () => {
    if (!this.state.loading) {
      this.setState({ loading: true }, () => debugLog('Loading:', this.state.loading));
    }
  }

  endLoading = () => {
    if (this.state.loading) {
      this.setState({ loading: false }, () => debugLog('Loading:', this.state.loading));
    }
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Typography variant="display1" align="center" color="primary" style={{ margin: '16px 0' }}>
                Update Ad
              </Typography>

              <Divider />

              <AdPostForm
                errors={this.state.errors}
                adPost={this.state.adPost}
                onSubmit={this.submitAdPost}
                onChange={this.updateAdPost}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default AdPostEditPage;
