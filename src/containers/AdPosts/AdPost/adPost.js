import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import debugLog from '../../../utils/debug';

import AdPost from '../../../modules/AdPost';

class AdPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      adPost: {}
    };
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

    const result = await AdPost.getAdPost(id);

    debugLog('Ad Post loaded: ', result);
    if (result && result.data) this.setState({ adPost: result.data });

    this.endLoading();
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

  convertDate = str => str ? new Date(str).toLocaleString() : ''

  render() {
    const { adPost } = this.state;

    const isTabletUp = window && window.matchMedia("(min-width: 600px)").matches;

    const imageElement = (
      <div>
        Image will go here
      </div>
    );

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Grid container spacing={24} justify="center">

                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Grid item xs={12} sm={10} md={8}>
                      <Typography variant="display2" color="primary" align="center" gutterBottom style={{ wordBreak: 'break-all' }}>
                        {adPost.title}
                      </Typography>

                      <Typography align="center">
                        {adPost.dateCreated ? `Date created: ${this.convertDate(adPost.dateCreated)}` : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={11}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={16} justify="center">
                    <Grid item xs={12} sm={6} md={5}
                      style={{
                        minHeight: 240,
                        border: '1px solid black'
                      }}
                    >
                      {imageElement}
                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                      {
                        adPost.city ? (
                          <Typography gutterBottom>
                            Region: {adPost.city}
                          </Typography>
                        ) : ''
                      }

                      {
                        adPost.province ? (
                          <Typography gutterBottom>
                            Province: {adPost.province}
                          </Typography>
                        ) : ''
                      }

                      {
                        adPost.availability ? (
                          <Typography gutterBottom>
                            Availability: {adPost.availability}
                          </Typography>
                        ) : ''
                      }

                      {
                        adPost.age ? (
                          <Typography gutterBottom>
                            Age: {adPost.age}
                          </Typography>
                        ) : ''
                      }

                      {
                        adPost.gender ? (
                          <Typography gutterBottom>
                            Gender: {adPost.gender}
                          </Typography>
                        ) : ''
                      }

                      {
                        adPost.ethnicity ? (
                          <Typography gutterBottom>
                            Ethnicity: {adPost.ethnicity}
                          </Typography>
                        ) : ''
                      }
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={11}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={16} justify="center">
                    <Grid item xs={12} sm={8} md={7}>
                      {
                        adPost.subtitle ? (
                          <Typography variant="display1" gutterBottom>
                            {adPost.subtitle}
                          </Typography>
                        ) : ''
                      }

                      {
                        adPost.desc ? (
                          <Typography>
                            {adPost.desc}
                          </Typography>
                        ) : ''
                      }
                    </Grid>

                    <Grid item xs={12} sm={4} md={3} style={{ border: '1px solid black' }}>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

AdPostPage.propTypes = {

};

AdPostPage.defaultProps = {

};

export default AdPostPage;
