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

const onPinClick = async (adPostId, onClick) => {
  try {
    const formData = new FormData();
    formData.append('adPostId', adPostId);
    formData.append('userId', AuthModule.getToken());
    formData.append('planName', 'std_pin_adpost');

    const result = await AdPostModule.pinAdPost(formData);

    if (!result.success) {
      debugLog('onPinClick Error: ', result);
      return;
    }

    debugLog('onPinClick: ', 'Ad pinned');
    loadUser(onClick);
  } catch (e) {
    debugLog('onPinClick: Error: Unable to pin ad', e);
  }
};

const PinButton = ({ onClick, style, adPostId }) => (
  <Button
    variant="raised" color="secondary"
    style={style}
    onClick={() => onPinClick(adPostId, onClick)}
  >
    Pin
  </Button>
);

PinButton.propTypes = {
  adPostId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object
};

PinButton.defaultProps = {
  onClick: () => {},
  style: {}
};

export default PinButton;
