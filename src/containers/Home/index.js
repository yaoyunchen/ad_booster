import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';

import ListView from '../../components/Views/List';

const HomePage = (props, context) => {
  return (
    <Grid container justify="center">
      <Grid xs={12}>
        <Card raised style={{ margin: '36px 24px' }}>
          <CardContent>
            <Typography variant="display1" align="center" color="primary" style={{ margin: '16px 0' }}>
              Ad Boost App
            </Typography>

            <Grid container>
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

HomePage.contextTypes = {
  province: PropTypes.string
};

export default HomePage;
