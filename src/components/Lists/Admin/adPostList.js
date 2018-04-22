import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile } from 'material-ui/GridList';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: 480,
    padding: '0 16px',
    backgroundColor: '#eaeaea',
    border: '2px solid lightgrey',
    borderRadius: 5
  },
  gridList: {
    width: '100%',
    height: '100%',
    paddingTop: 16,
    marginRight: '-15px !important',
    paddingRight: 15
  },
  subheader: {
    width: '100%'
  }
});

const AdminAdPostList = ({
  classes, adPosts, onManageClick
}) => {
  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="title">
          Ad Posts
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography align="center" style={{ height: 60, border: '1px dotted black', background: 'white', borderRadius: 5 }}>
          Filter / Search bar here
          </Typography>
      </Grid>

      <Grid item xs={12}>
        <div className={classes.root}>
          <GridList
            cellHeight={100} cols={1}
            className={classes.gridList}
          >
            {adPosts.map(adPost => {
              let borderColor = adPost.expired ? '#ed4236' : '#3f51b5';

              return (
                <GridListTile key={adPost.id} style={{
                  height: 'auto',
                  maxHeight: 400,
                  marginBottom: 16,
                  backgroundColor: 'white',
                  border: `2px solid ${borderColor}`,
                  borderRadius: 10,
                  padding: 16
                }}>
                  <Grid container spacing={8} alignItems="center" style={{ height: '100%' }}>
                    <Hidden smUp>
                      <Grid item xs={12} sm={3} md={2} style={{ marginBottom: 16 }}>
                        <div
                          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
                        >
                          <img
                            alt={adPost.title}
                            src={`${process.env.PUBLIC_URL}${adPost && Array.isArray(adPost.photos) && adPost.photos[0]}`}
                            style={{ width: 60, height: 'auto', borderRadius: 5 }}
                          />
                        </div>
                      </Grid>
                    </Hidden>

                    <Hidden xsDown>
                      <Grid item xs={12} sm={3}>
                        <div
                          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
                        >
                          <img
                            alt={adPost.title}
                            src={`${process.env.PUBLIC_URL}${adPost && Array.isArray(adPost.photos) && adPost.photos[0]}`}
                            style={{ width: 120, height: 'auto', borderRadius: 5 }}
                          />
                        </div>
                      </Grid>
                    </Hidden>

                    <Grid item xs={12} sm={9}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="title" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {adPost.title}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="subheading" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {adPost.subtitle}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="caption" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            <b>Posted By: </b>{`${adPost.user.firstname} ${adPost.user.lastname}`}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography>
                            <b>Location: </b>{`${adPost.region}, ${adPost.province}`}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography color={adPost.expired ? "error" : "default"} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            <b>Created: </b> {adPost.createdAt} {adPost.expired && ', expired'}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography>
                                <b>Visits: </b>{adPost.visits}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Typography>
                                <b>Replies: </b>{adPost.replies}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: 16 }}>
                          <Link
                            to="/posts/edit" params={{ id: adPost.id }}
                            style={{ color: 'inherit' }}
                          >
                            <Button
                              variant="raised" color="primary"
                              onClick={e => onManageClick(e, adPost)}
                            >
                              Manage
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      </Grid>
    </Grid>
  );
};

AdminAdPostList.propTypes = {
  classes: PropTypes.object.isRequired,
  onManageClick: PropTypes.func.isRequired,
  adPosts: PropTypes.array.isRequired
};

export default withStyles(styles)(AdminAdPostList);
