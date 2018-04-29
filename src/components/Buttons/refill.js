import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';

const RefillButton = ({ onClick, style }) => (
  <Button
    variant="raised" color="secondary"
    style={style}
    onClick={() => onClick()}
  >
    Refill Points
  </Button>
);

RefillButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};

RefillButton.defaultProps = {
  style: {}
};

export default RefillButton;
