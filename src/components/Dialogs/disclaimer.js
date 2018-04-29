import React from 'react';
import PropTypes from 'prop-types';

import Dialog, {
  DialogActions, DialogContent, DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography'

const DisclaimerDialog = ({
  content, open, onClick, onCancel
}) => {
  const termsList = (
    <List style={{ listStyleType: 'disc', marginLeft: 16 }}>
      {
        content.terms.map((term, i) => {
          return (
            <ListItem key={i} dense style={{
              display: 'list-item',
              paddingLeft: 0,
              marginLeft: 16
            }}>
              <Typography>{term}</Typography>
            </ListItem>
          );
        })
      }
    </List>
  );

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="dialog-title"
    >

      <DialogTitle id="dialog-title">{content.title}</DialogTitle>

      <DialogContent>
        <Typography>{content.description}</Typography>

        {termsList}
      </DialogContent>

      <DialogActions>
        <Button
          label={content.actions.accept.text}
          color="primary"
          variant="raised"
          onClick={() => onClick()}
        >
          {content.actions.accept.text}
        </Button>

        <Button
          label={content.actions.decline.text}
          color="secondary"
          onClick={() => onCancel()}
        >
          {content.actions.decline.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DisclaimerDialog.propTypes = {
  content: PropTypes.object,
  open: PropTypes.bool,
  disclaimer: PropTypes.bool,
  onClick: PropTypes.func,
  onCancel: PropTypes.func
};

DisclaimerDialog.defaultProps = {
  content: {
    title: 'Disclaimer Title',
    description: 'A short description of the disclaimer goes here.',
    terms: [
      'Term condition one',
      'Term condition two, this is term condition two.',
      'Term condition three here.',
      'Number four'
    ],
    actions: {
      accept: {
        text: 'Agree'
      },
      decline: {
        text: 'Return'
      }
    }
  }
};

export default DisclaimerDialog;
