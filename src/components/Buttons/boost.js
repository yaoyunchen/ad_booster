import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';

import debugLog from '../../utils/debug';

import AuthModule from '../../modules/authModule';
import AdPostModule from '../../modules/adPostModule';
import UserModule from '../../modules/userModule';

const loadUser = async (onClick) => {
  try {
    const result = await UserModule.getUser(AuthModule.getToken());

    if (result && result.data) {
      debugLog('loadUser (Success): ', result.data);
      onClick(result.data);
      return;
    }

    debugLog('loadUser (Error): ', result);
  } catch (e) {
    debugLog('loadUser (Error): ', e);
  }
};

const onBoostClick = async(adPostId, onClick) => {
  try {
    const formData = new FormData();
    formData.append('adPostId', adPostId);
    formData.append('userId', AuthModule.getToken());
    formData.append('planName', 'std_boost_adpost');

    const result = await AdPostModule.boostAdPost(formData);

    if (!result.success) {
      debugLog('onBoostClick Error: ', result);
      return;
    }

    debugLog('onBoostClick: ', 'Ad boosted');
    loadUser(onClick);
  } catch (e) {
    debugLog('onBoostClick: Error: Unable to boost ad', e);
  }
};

const BoostButton = ({ onClick, style, adPostId }) => (
  <Button
    variant="raised" color="primary"
    style={style}
    onClick={() => onBoostClick(adPostId, onClick)}
  >
    Boost
  </Button>
);

BoostButton.propTypes = {
  adPostId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object
};

BoostButton.defaultProps = {
  onClick: () => {},
  style: {}
};

export default BoostButton;
