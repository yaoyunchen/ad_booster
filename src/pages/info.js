import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';

import PageTitle from '../components/pageTitle';

const InfoPage = (props, context) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={10}>
        <Card raised style={{ margin: '36px 24px' }}>
          <CardContent>
            <PageTitle title="Info" />

            <Grid container justify="center">
              <Grid item xs={12} lg={10}>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

InfoPage.contextTypes = {
  province: PropTypes.string
};

export default InfoPage;
