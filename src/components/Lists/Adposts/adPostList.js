import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile } from 'material-ui/GridList';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import debugLog from '../../../utils/debug';

import AdPostModule from '../../../modules/AdPost';

// import content from '../../../content';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '80vh'
  },
  gridList: {
    width: '100%',
    height: '100%',
    marginRight: '-15px !important',
    padding: '1px 15px 1px 1px'
  },
  subheader: {
    width: '100%'
  }
});

class AdPostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      adPosts: []
    };
  }

  componentDidMount() {
    this.getAdPosts({ province: this.props.province });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.province !== nextProps.province) this.getAdPosts();
  }

  getAdPosts = async (params) => {
    this.startLoading();

    const AdPost = new AdPostModule();
    const results = await AdPost.getAdPosts(params);

    debugLog('AdPost results:', results);

    if (results && results.data) this.setState({ adPosts: results.data });
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

  buildImageElement = (adPost) => {
    const { photos } = adPost;

    let size = 60;
    if (window && window.matchMedia("(min-width: 600px)").matches) {
      size = 80;
    }

    if (!photos || photos.length === 0) {
      return (
        <Icon style={{
          fontSize: size,
          color: '#c1c1c1',
          border: '2px solid rgb(63, 81, 181, 0.15)',
          borderRadius: 5,
          overflow: 'hidden'
        }}>
          person_outline
      </Icon>
      );
    }

    // const photo = photos[0]
    const photo = `${process.env.PUBLIC_URL}/assets/images/adPost/1.png`;

    return (
      <div
        style={{
          position: 'relative',
          float: 'left',
          width:  size,
          height: size,
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `url(${photo})`,
          border: '2px solid rgb(63, 81, 181, 0.15)',
          borderRadius: 5,
          border: '2px solid #e0e0e0'
        }}
      />
    )
  }

  buildListElements = () => {
    const isTabletUp = window && window.matchMedia("(min-width: 600px)").matches;

    return this.state.adPosts.map((adPost) => {
      const imageEle = this.buildImageElement(adPost);

      return [
        <GridListTile key={adPost._id} style={{
          height: isTabletUp ? 120 : 'auto',
          padding: isTabletUp ? 0 : '8px',
          margin: '8px 0',
          border: '2px solid #3f51b5',
          borderRadius: 5
        }}>
          <Link to={`/post/${adPost._id}`}>
            <Grid
              container alignItems="center" style={{ height: '100%' }}
            >
              <Grid item xs={12} sm={3} md={2} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'middle'
              }}>
                {imageEle}
              </Grid>

              <Grid item xs={12} sm={9} md={10}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      variant="title"
                      style={{
                        // textOverflow: 'ellipsis',
                        // overflow: 'hidden',
                        // whiteSpace: 'nowrap',
                        margin: isTabletUp ? 0 : '12px 0'
                      }}
                    >
                      {adPost.title}
                    </Typography>
                  </Grid>

                  <Grid
                    item xs={12}
                    style={{
                      maxHeight: 96,
                      overflow: 'hidden'
                    }}
                  >
                    <Typography
                      variant="subheading"
                      style={{
                        // textOverflow: 'ellipsis',
                        // overflow: 'hidden',
                        // whiteSpace: 'nowrap',
                        marginBottom: isTabletUp ? 0 : 12
                      }}
                    >
                      {adPost.desc}
                    </Typography>

                    <Grid item xs={12}>
                      <Typography variant="caption">
                        {`${adPost.city} - ${adPost.region} - ${new Date(adPost.dateCreated).toLocaleString()}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Link>
        </GridListTile>,
        <Divider key={`${adPost.id}-divider`} style={{
          height: 2,
          padding: 0,
          backgroundColor: '#eaeaea'
        }}/>
      ];
    });
  }

  render() {
    const { classes } = this.props;

    const adPostElements = this.buildListElements();

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} style={{
          marginBottom: 16,
          height: 90,
          border: '1px dotted grey'
        }}>
          <Typography>Search bar goes here</Typography>
        </Grid>

        <Grid item xs={12} style={{
          padding: 0
        }}>
          <div className={classes.root}>
            <GridList cellHeight={100} cols={1} className={classes.gridList}>
              {adPostElements}
            </GridList>
          </div>
        </Grid>
      </Grid>
    );
  }
}

AdPostList.propTypes = {
  classes: PropTypes.object.isRequired,
  province: PropTypes.string.isRequired
};

export default withStyles(styles)(AdPostList);
