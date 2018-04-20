import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

const PageTitle = ({ title }) => (
  <Typography
    variant="display1" align="center" color="primary"
    style={{ margin: '16px 0' }}
  >
    {title}
  </Typography>
);

PageTitle.propTypes = {
  title: PropTypes.string
};

PageTitle.defaultProps = {
  title: 'Page Title'
};

export default PageTitle;
