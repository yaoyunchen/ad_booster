import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

const ImageEle = () => (
  <Icon style={{ fontSize: 80, color: '#c1c1c1' }}>
    person_outline
  </Icon>
);

const ListEle = () => {
  return (
    <List>
      <Divider />

      <ListItem button>
        <ListItemIcon>
          <ImageEle />
        </ListItemIcon>

        <ListItemText
          primary="List Item Title"
          secondary="List Item Description"
        />
      </ListItem>

      <Divider />

      <ListItem button>
        <ListItemIcon>
          <ImageEle />
        </ListItemIcon>

        <ListItemText
          primary="List Item Title"
          secondary="List Item Description"
        />
      </ListItem>

      <Divider />

      <ListItem button>
        <ListItemIcon>
          <ImageEle />
        </ListItemIcon>

        <ListItemText
          primary="List Item Title"
          secondary="List Item Description"
        />
      </ListItem>

      <Divider />

      <ListItem button>
        <ListItemIcon>
          <ImageEle />
        </ListItemIcon>

        <ListItemText
          primary="List Item Title"
          secondary="List Item Description"
        />
      </ListItem>

      <Divider />

      <ListItem button>
        <ListItemIcon>
          <ImageEle />
        </ListItemIcon>

        <ListItemText
          primary="List Item Title"
          secondary="List Item Description"
        />
      </ListItem>

      <Divider />
    </List>
  );
};

class ListView extends React.Component {
  render() {
    return (
      <div>
        <div style={{ margin: '16px 0' }}>
          <Typography variant="title" gutterbottom="true">
          Today
        </Typography>

        <ListEle />
        </div>

        <div style={{ margin: '16px 0' }}>
          <Typography variant="title" gutterbottom="true">
            Yesterday
          </Typography>

          <ListEle />
        </div>
      </div>
    );
  }
}

export default ListView;
