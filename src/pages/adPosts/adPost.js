import React from 'react';

import Card, { CardContent } from 'material-ui/Card';

import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
// import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

import debugLog from '../../utils/debug';

import AdPostModule from '../../modules/adPostModule';

import { convertDate } from '../../helpers/contentHelper';

import './styles.scss';

class AdPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      adPost: {},
      selectedPhoto: 0
    };
  }

  componentDidMount() {
    this.getAdPost();
  }

  getAdPost = async () => {
    this.startLoading();

    try {
      const id = this.props.match.params.id;
      const result = await AdPostModule.getAdPost(id);

      const { data } = result;
      if (data && data.data) this.setState({ adPost: data.data });
      debugLog('Ad Post loaded: ', data);
    } catch (e) {
      debugLog('Unable to get id param');
    }

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

  onPhotoIconClick = (i) => {
    this.setState({
      selectedPhoto: i
    });
  }

  buildImageElement = () => {
    const {
      selectedPhoto
    } = this.state;

    // temp
    const photos = [
      `${process.env.PUBLIC_URL}/assets/images/adPost/1.png`,
      `${process.env.PUBLIC_URL}/assets/images/adPost/2.png`,
      `${process.env.PUBLIC_URL}/assets/images/adPost/3.png`,
      `${process.env.PUBLIC_URL}/assets/images/adPost/4.png`,
      `${process.env.PUBLIC_URL}/assets/images/adPost/5.png`
    ];

    return (
      <div className="image">
        <div className="image__icons">
          {/*
            <Icon style={{ fontSize: 20 }} className="image__icons--left">
            keyboard_arrow_left
            </Icon>
          */}

          <div className="image__icons--photos">
            {
              photos.map((image, i) => {
                return (
                  <div
                    key={i}
                    className={`image__icons--photo ${selectedPhoto === i ? 'image__icons--current' : ''}`}
                    onClick={() => this.onPhotoIconClick(i)}
                  >
                    <img src={image} alt={i} />
                  </div>
                );
              })
            }
          </div>

          {/*
            <Icon className="image__icons--right" style={{ fontSize: 20 }}>
              keyboard_arrow_right
            </Icon>
          */}
        </div>

        <div className="image__main">
          <img src={photos[selectedPhoto]} alt={selectedPhoto} />
        </div>
      </div>
    );
  }

  render() {
    const { adPost } = this.state;
    if (!adPost) return;

    const imageElement = this.buildImageElement();

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card raised style={{ margin: '36px 24px' }}>
            <CardContent>
              <Grid container spacing={24} justify="center">

                <Grid item xs={12} md={8}>
                  <Grid container justify="center">
                    <Grid item xs={12} sm={10} md={8}>
                      <Typography variant="display2" color="primary" align="center" gutterBottom style={{ wordBreak: 'break-all' }}>
                        {adPost.title}
                      </Typography>

                      <Typography align="center">
                        {adPost.dateCreated ? `Date created: ${convertDate(adPost.dateCreated)}` : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Divider />
                </Grid>

                <Grid item xs={12} md={8}>
                  <Grid container spacing={16} justify="center">
                    <Grid item xs={12} sm={8}>
                      {imageElement}
                    </Grid>

                    <Grid item xs={12} sm={4}>
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

                <Grid item xs={12} md={8}>
                  <Divider />
                </Grid>

                <Grid item xs={12} md={8}>
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
