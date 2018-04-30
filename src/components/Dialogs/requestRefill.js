import React from 'react';
import PropTypes from 'prop-types';

import Dialog, {
  DialogActions, DialogContent, DialogTitle, DialogContentText
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import debugLog from '../../utils/debug';

import AuthModule from '../../modules/authModule';
import RequestModule from '../../modules/requestModule';

class RequestRefillDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email || '',
      phone: props.phone || ''
    };
  }

  handleChange = name => e => this.setState({ [name]: e.target.value })

  buildFormData = () => {
    const formData = new FormData();

    formData.append('email', this.state.email);
    formData.append('phone', this.state.phone);
    formData.append('requesterId', '5ad5869670fe191996e5852c');
    return formData;
  };

  onRequestRefill = async (e) => {
    e.preventDefault();

    if (!this.state.email) {
      alert('Email is required');
      return;
    }

    try {
      const formData = this.buildFormData();

      const result = await RequestModule.postRefillRequest(formData);

      if (!result.success) {
        debugLog('onRequestRefill Error: ', result);
        return;
      }

      debugLog('onRequestRefill: ', 'Request created');
    } catch(e) {
      debugLog('onRequestRefill Error: ', e);
    }

    this.props.onCancel();
  }

  render() {
    const { open, onCancel } = this.props;
    return (
      <Dialog open={open}>
        <DialogTitle>Refill your points</DialogTitle>

        <DialogContent>
          <DialogContentText style={{ margin: '16px 0' }}>
            Please provide your contact information.  Our admins will reach out to you about refilling your points.
          </DialogContentText>

          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField
                id="email" label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="phone" label="phone"
                value={this.state.phone}
                onChange={this.handleChange('phone')}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="raised" color="secondary"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>

          <Button
            variant="raised" color="primary"
            onClick={e => this.onRequestRefill(e)}
          >
            Contact
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

RequestRefillDialog.propTypes = {
  open: PropTypes.bool,
  email: PropTypes.string,
  phone: PropTypes.string,
  onClose: PropTypes.func
};

RequestRefillDialog.defaultProps = {
  open: false,
  email: '',
  phone: '',
  onClose: () => {}
};

export default RequestRefillDialog;
