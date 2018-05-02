import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile } from 'material-ui/GridList';
import Icon from 'material-ui/Icon';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import debugLog from '../../utils/debug';
import AdPostModule from '../../modules/adPostModule';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
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

const initialSearchState = {
  text: '',
  age: '',
  availability: '',
  gender: '',
  ethnicity: '',
  region: ''
};

class AdPostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      adPosts: [],
      pinnedAdPosts: [],
      search: initialSearchState,
      searchMessage: ''
    };
  }

  componentDidMount() {
    this.getAdPosts();
    this.getPinnedAdPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.province !== nextProps.province) this.getAdPosts({ province: nextProps.province });
  }

  getAdPosts = async (params = {}) => {
    this.startLoading();

    const query = params;
    if (!query.province) query.province = this.props.province;
    // Do not include the pinned posts in the regular results.
    query.pinned = false;

    const result = await AdPostModule.getAdPosts(query);
    const { data } = result;

    debugLog('AdPost results:', data);

    this.setState({ adPosts: data.data });

    this.endLoading();
  }

  getPinnedAdPosts = async () => {
    this.startLoading();

    const result = await AdPostModule.getPinnedAdPosts(this.props.province);
    const { data } = result;
    debugLog('Pinned adpost results:', data);

    this.setState({ pinnedAdPosts: data.data });

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

  buildListElements = (adPosts, pinned = false) => {
    const isTabletUp = window && window.matchMedia("(min-width: 600px)").matches;

    if (adPosts.length === 0) return;

    return adPosts.map((adPost, i) => {
      if (adPost.pinned && !pinned) return '';

      const imageEle = this.buildImageElement(adPost);

      return [
        <GridListTile key={adPost._id} style={{
          height: isTabletUp ? 120 : 'auto',
          padding: isTabletUp ? 0 : '8px',
          margin: '8px 0',
          border: pinned ? '2px solid red' : '2px solid #3f51b5',
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
        <section key={`${adPost.id}-divider`} style={{ height: 0, padding: 0 }}>
          {
            i === adPosts.length - 1 ? '' : (
              <Divider style={{
                height: 2,
                padding: 0,
                backgroundColor: '#eaeaea'
              }} />
            )
          }
        </section>
      ];
    });
  }

  updateSearch = (field, value) => {
    const { search } = this.state;
    search[field] = value;
    this.setState({ search });
  }

  /* eslint-disable max-statements */
  submitSearch = async (e) => {
    e.preventDefault();

    try {
      const { search } = this.state;
      if (search.text === '' && search.age === '' &&
        search.availability === '' && search.gender === '' &&
        search.ethnicity === '' && search.region === ''
      ) {
        debugLog('No search parameters provided');
        this.setState({ searchMessage: '' });
        return this.getAdPosts({ province: this.props.province });
      }

      search.search = search.text;
      search.province = this.props.province;
      const result = await AdPostModule.getAdPostsWithSearch(search);

      const { data, status } = result;
      if (status && status !== 200) {
        debugLog('submitSearch Error: ', result);

        this.setState({
          searchMessage: 'No results found',
          search: initialSearchState
        });
        return;
      }

      if (data && data.success) {
        if (data.data.length === 0) {
          this.setState({
            searchMessage: 'No results found',
            search: initialSearchState
          });
          return;
        }

        this.setState({
          adPosts: data.data,
          search: initialSearchState,
          searchMessage: ''
        });
      }
    } catch (e) {
      debugLog('submitSearch: Error: Unable to search', e);
    }
  }

  buildSearchBar = () => {
    const { search } = this.state;

    return (
      <div
        style={{
          marginBottom: 16,
          padding: 16,
          height: 'auto',
          border: '1px dotted grey'
        }}
      >
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="title">Search</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <TextField
              id="search"
              label="Enter search term"
              InputLabelProps={{ shrink: true }}
              value={this.state.search.text}
              onChange={e => this.updateSearch('text', e.target.value)}
              style={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InputLabel shrink style={{ fontSize: 12 }}>
              Availability
            </InputLabel>

            <RadioGroup
              name="availability"
              value={search.availability || ''}
              onChange={e => this.updateSearch('availability', e.target.value)}
              style={{ flexDirection: 'row' }}
            >
              <FormControlLabel
                value="in"
                control={
                  <Radio
                    style={{ width: 36, height: 36, marginLeft: 8 }}
                    color="primary"
                  />
                }
                label="In"
              />

              <FormControlLabel
                value="out"
                control={
                  <Radio
                    style={{ width: 36, height: 36 }}
                    color="primary"
                  />
                }
                label="Out"
              />

              <FormControlLabel
                value="both"
                control={
                  <Radio
                    style={{ width: 36, height: 36 }}
                    color="primary"
                  />
                }
                label="Both"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InputLabel shrink style={{ fontSize: 12 }}>
              Gender
            </InputLabel>

            <Select
              id="gender"
              value={search.gender || ''}
              style={{ width: '100%' }}
              onChange={e => this.updateSearch('gender', e.target.value)}
            >
              <MenuItem value="male">
                Male
              </MenuItem>

              <MenuItem value="female">
                Female
              </MenuItem>

              <MenuItem value="transgender">
                Transgender
              </MenuItem>

              <MenuItem value="other">
                Other
              </MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InputLabel shrink style={{ fontSize: 12 }}>
              Ethnicity
            </InputLabel>

            <Select
              id="ethnicity"
              value={search.ethnicity || ''}
              style={{ width: '100%' }}
              onChange={e => this.updateSearch('ethnicity', e.target.value)}
            >
              <MenuItem value="Asian">
                Asian
              </MenuItem>

              <MenuItem value="caucasian">
                Caucasian
              </MenuItem>

              <MenuItem value="black">
                Black
              </MenuItem>

              <MenuItem value="other">
                Other
              </MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={12} md={4}
            style={{ margin: '16px 0' }}
          >
            <Button
              variant="raised" color="primary" style={{ minWidth: 120 }}
              onClick={e => this.submitSearch(e)}
            >
              Search
            </Button>
          </Grid>

          {
            this.state.searchMessage ? (
              <Typography color="error">
                {this.state.searchMessage}
              </Typography>
            ) : ''
          }
        </Grid>
      </div>
    );
  };


  render() {
    const { classes } = this.props;
    const { adPosts, pinnedAdPosts } = this.state;

    const adPostElements = this.buildListElements(adPosts);
    const pinnedElements = this.buildListElements(pinnedAdPosts, true);

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          {this.buildSearchBar()}
        </Grid>

        <Grid item xs={12} style={{ padding: 0, margin: '16px 0 32px' }}>
          <Typography variant="display1">
            Featured Ads
          </Typography>

          <div className={classes.root}>
            <GridList
              cellHeight={100} cols={1}
              className={`${classes.gridList} gridlist-override`}
            >
              {pinnedElements || <div />}
            </GridList>
          </div>
        </Grid>

        <Grid item xs={12} style={{ padding: 0 }}>
          <div className={classes.root} style={{ height: '80vh' }}>
            <GridList
              cellHeight={100} cols={1}
              className={`${classes.gridList} gridlist-override`}
            >
              {adPostElements || <div />}
            </GridList>
          </div>
        </Grid>
      </Grid>
    );
  }
}

AdPostList.propTypes = {
  classes: PropTypes.object.isRequired,
  province: PropTypes.string
};

AdPostList.defaultProps = {
  province: 'BC'
};

export default withStyles(styles)(AdPostList);
