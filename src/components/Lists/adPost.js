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
      search: initialSearchState,
      searchMessage: ''
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

    const results = await AdPostModule.getAdPosts(params);

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

  updateSearch = (field, value) => {
    const { search } = this.state;
    search[field] = value;
    this.setState({ search });
  }

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

      search.province = this.state.province;
      const result = await AdPostModule.getAdPostsWithSearch(search);

      if (!result.success) {
        debugLog('submitSearch Error: ', result);
        return;
      }

      if (result.success) {
        console.log(result.data)
        if (result.data.length === 0) {
          this.setState({
            searchMessage: 'No results found',
            search: initialSearchState
          });
          return;
        }

        this.setState({
          adPosts: result.data,
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

    const adPostElements = this.buildListElements();

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          {this.buildSearchBar()}
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
