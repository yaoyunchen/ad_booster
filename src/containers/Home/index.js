import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';

import ListView from '../../components/Views/List';

const HomePage = (props, context) => {
  return (
    <Grid container justify="center" style={{ margin: '32px 16px' }}>
      <Grid item xs={12}>
        <Typography variant="display3" align="center">
          Home Page
        </Typography>
      </Grid>

      <Grid item xs={12} sm={9} style={{ padding: 16 }}>
        <ListView province={context.province} />
      </Grid>

      <Grid item xs={12} sm={3} style={{ padding: 16 }}>
        <Hidden xsDown>
          <div style={{ margin: '16px 0' }}>
            <Typography variant="headline" gutterbottom="true">
              Something here
            </Typography>
          </div>
        </Hidden>
      </Grid>
    </Grid>
  );
};

HomePage.contextTypes = {
  province: PropTypes.string
};

export default HomePage;
