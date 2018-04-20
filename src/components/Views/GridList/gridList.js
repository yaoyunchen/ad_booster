import React from 'react';
import PropTypes from 'prop-types';

import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '100%'
  },
  gridList: {
    width: '100%',
    height: 300,
  },
  subheader: {
    width: '100%',
  },
});


class GridListView extends React.Component {
  render() {
    const { data, classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList
          cellHeight={100} cols={1}
          className={classes.gridList}
          style={{ border: '1px solid green' }}
        >
          {data.map(item => {
            return (
              <GridListTile
                key={item.id}
                style={{ border: '1px solid blue' }}
              >
                <Typography style={{ height: 75 }}>
                  {`${item.firstname} ${item.lastname}`}
                </Typography>
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}


GridListView.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GridListView);
