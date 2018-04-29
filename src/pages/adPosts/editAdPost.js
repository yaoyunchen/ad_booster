import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Auth from '../../modules/authModule';
import AdPostModule from '../../modules/adPostModule';

import debugLog from '../../utils/debug';

import AdPostForm from '../../components/Forms/AdPost';

class AdPostEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { adPost: {}, errors: {} };
  }

  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
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

    const result = await AdPostModule.getAdPost(id);

    debugLog('Ad Post loaded: ', result);
    if (result && result.data) this.setState({
      adPost: result.data
    });

    this.endLoading();
  }


  buildFormData = () => {
    const formData = new FormData();
    const { adPost } = this.state;
    const keys = Object.keys(adPost);
    for (let i = 0; i< keys.length; i++) {
      const key = keys[i];
      const value = adPost[key];

      if (key === 'photos') {
        for (let j = 0; j < value.length; j++) {
          if (value[j].file) {
            formData.append(`${key}[${j}]`, value[j].file, value[j].file.name);
          } else {
            formData.append(`${key}[${j}]`, value[j].url);
          }
        }
      } else {
        formData.append(key, value);
      }
    }

    formData.append('requesterId', Auth.getToken());

    return formData;
  };

  submitAdPost = async (e) => {
    e.preventDefault();

    try {
      const formData = this.buildFormData();

      const result = await AdPostModule.updateAdPost(formData);

      if (!result.success) {
        debugLog('submitAdPost Error: ', result);
        return;
      }

      debugLog('submitAdPost: ', 'AdPost updated');
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
                state="edit"
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
