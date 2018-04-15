import React from 'react';

import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

import Typography from 'material-ui/Typography';

import ListView from '../../components/Views/List';

const HomePage = () => {
  return (
    <Grid container justify="center" spacing={24}>
      <Grid item xs={12}>
        <Typography variant="display3" align="center">
          Home Page
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        <ListView />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Hidden xsDown>
          <div style={{ margin: '16px 0' }}>
            <Typography variant="title" gutterbottom="true">
              Something here
            </Typography>
          </div>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default HomePage;
