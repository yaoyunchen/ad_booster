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
      email: '',
      phone: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.email !== nextProps.email) this.setEmail(nextProps.email);

    if (this.props.phone !== nextProps.phone) this.setPhone(nextProps.phone);
  }

  setEmail = email => this.setState({ email });
  setPhone = phone => this.setState({ phone });

  handleChange = name => e => this.setState({ [name]: e.target.value })

  buildFormData = () => {
    const formData = new FormData();

    formData.append('email', this.state.email || this.props.email);
    formData.append('phone', this.state.phone || this.props.phone);
    formData.append('requesterId', AuthModule.getToken());
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
      const { data } = result;

      if (data && data.success) {
        debugLog('onRequestRefill: ', 'Request created');
      } else {
        debugLog('onRequestRefill Error: ', result);
      }
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
