import React from 'react';
import PropTypes from 'prop-types';

import Dialog, {
  DialogActions, DialogContent, DialogTitle, DialogContentText
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const provinceArray = [
  {
    name: 'Alberta',
    code: 'AB'
  },
  {
    name: 'British Columbia',
    code: 'BC'
  },
  {
    name: 'Manitoba',
    code: 'MB'
  },
  {
    name: 'New Brunswick',
    code: 'NB'
  },
  {
    name: 'Newfoundland and Labrador',
    code: 'NL'
  },
  {
    name: 'Nova Scotia',
    code: 'NS'
  },
  {
    name: 'Northwest Territories',
    code: 'NT'
  },
  {
    name: 'Nunavut',
    code: 'NU'
  },
  {
    name: 'Ontario',
    code: 'ON'
  },
  {
    name: 'Prince Edward Island',
    code: 'PE'
  },
  {
    name: 'Quebec',
    code: 'QC'
  },
  {
    name: 'Saskatchewan',
    code: 'SK'
  },
  {
    name: 'Yukon',
    code: 'YT'
  }
];

class RegionSelect extends React.Component {
  handleProvinceChange = (e) => {
    const province = e.target.value;
    if (!province) return;

    localStorage.setItem('province', province);
    this.props.onChange(province);
  }


  render() {
    const { open, province, onCancel } = this.props;
    const provinceSelectItems = provinceArray.map((prov) => {
      return (
        <MenuItem
          key={prov.code}
          value={prov.code}
        >
          {
            prov.code === province ? (
              <em>{prov.name}</em>
            ) : prov.name
          }
        </MenuItem>
      );
    });

    return (
      <Dialog
        open={open}
        disableBackdropClick={province !== '' ? false : true}
        disableEscapeKeyDown={province !== '' ? false : true}
        aria-labelledby="dialog-title"
      >
        <div style={{ padding: '32px' }}>
          <DialogTitle id="dialog-title">Province Select</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please select your province to continue.
            </DialogContentText>

            <br />

            <Select
              value={province || ''}
              onChange={this.handleProvinceChange}
              fullWidth
            >
              {provinceSelectItems}
            </Select>
          </DialogContent>

          <br />

          <DialogActions>
            <Button
              label="Cancel"
              color="secondary"
              variant="raised"
              disabled={!province ? true : false}
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

RegionSelect.propTypes = {
  open: PropTypes.bool,
  province: PropTypes.string,
  onChange: PropTypes.func,
  onCancel: PropTypes.func
};

RegionSelect.defaultProps = {
  open: false,
  province: '',
  onSelect: () => {},
  onCancel: () => {}
};

export default RegionSelect;
