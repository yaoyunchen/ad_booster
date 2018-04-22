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

const AdminUserList = ({
  classes, users, onManageClick
}) => {
  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="title">Users</Typography>
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
            {users.map(user => {
              let userName = user.firstname;
              if (user.middlename) userName += ` ${user.middlename}`;
              userName += ` ${user.lastname}`;

              let borderColor = user.accountType === 'admin' ? 'green' : '#3f51b5';

              return (
                <GridListTile key={user.id} style={{
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
                            alt={userName}
                            src={`${process.env.PUBLIC_URL}${user.photo}`}
                            style={{ width: 60, height: 'auto', borderRadius: 5 }}
                          />
                        </div>
                      </Grid>
                    </Hidden>

                    <Hidden xsDown>
                      <Grid item xs={12} sm={3} md={2}>
                        <div
                          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
                        >
                          <img
                            alt={userName}
                            src={`${process.env.PUBLIC_URL}${user.photo}`}
                            style={{ width: 60, height: 'auto', borderRadius: 5 }}
                          />
                        </div>
                      </Grid>
                    </Hidden>

                    <Grid item xs={12} sm={9} md={10}>
                      <Grid container>
                        <Grid item xs={12} sm={8}>
                          <Typography style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            <b>Name:</b> {userName}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <Typography style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            <b>Points:</b> {user.points}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                          <Grid container spacing={8}>
                            <Grid item xs={12}>
                              <Typography style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                <b>Created: </b> {user.createdAt}
                              </Typography>
                            </Grid>

                            <Grid item xs={12}>
                              <Typography
                                color={user.emailConfirmed ? 'primary' : 'error'}
                                style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                              >
                                {user.emailConfirmed ? 'Verified' : 'Not Verified'}
                                {`, ${user.accountType}`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={4} style={{ marginTop: 16 }}>
                          <Link
                            to={{ pathname: '/user/edit', state: { id: user.id } }}
                            style={{ color: 'inherit' }}
                          >
                            <Button
                              variant="raised" color="primary"
                              // onClick={e => onManageClick(e, user)}
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

AdminUserList.propTypes = {
  classes: PropTypes.object.isRequired,
  onManageClick: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default withStyles(styles)(AdminUserList);
