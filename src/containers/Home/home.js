import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import ListView from '../../components/Views/List';

import PageTitle from '../../components/PageTitle';
import AdPostList from '../../components/Lists/Adposts';

const HomePage = (props, context) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Card raised style={{ margin: '36px 24px' }}>
          <CardContent>
            <PageTitle title="Ad Boost App" />

            <Grid container>
              <Grid item xs={12}>
                <AdPostList
                  province={context.province}
                />
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
