import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemIcon } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

const mockDataGenerator = (int) => {
  const mockData = [];
  for (let i = 0; i < int; i += 1) {
    let dateCreated;

    const random = Math.random();

    if (random < 0.33) {
      dateCreated = new Date() - 86400000 + (60000 * i);
    } else if (random >= 0.33 && random < 0.67) {
      dateCreated = new Date() - 172800000 + (60000 * i);
    } else {
      dateCreated = new Date().getTime() + (60000 * i);
    }

    const mockPost = {
      title: `Title ${i + 1}`,
      description: `This is the description of post ${i + 1}.  It is just a description.  Enter a description here.`,
      dateCreated,
      city: 'Vancouver',
      region: 'BC'
    };

    mockData.push(mockPost);
  }

  return mockData.reverse();
};

const ImageEle = () => (
  <Icon style={{ fontSize: 80, color: '#c1c1c1', overflow: 'inherit' }}>
    person_outline
  </Icon>
);

class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: mockDataGenerator(30),
      filteredData: {},
    };
  }

  componentWillMount() {
    this.filterDataByDates();
  }

  filterDataByDates = () => {
    let data = this.state.rawData.slice();
    const filteredData = {};

    // data = data.map((post) => {
    //   post.dateCreated = new Date(post.dateCreated).toDateString();
    //   return post;
    // });

    filteredData.today = data.filter((post, i) => {
      const date = new Date(post.dateCreated).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);

      const match = date === today;

      if (match) data.splice(i, 1);

      return match;
    });

    filteredData.yesterday = data.filter((post, i) => {
      const date = new Date(post.dateCreated).setHours(0, 0, 0, 0);
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0);

      const match = date === yesterday;

      if (match) data.splice(i, 1);
      return match;
    });

    filteredData.older = data;

    this.setState({ filteredData });
  }

  generateListEle = (data) => {
    const listElement = data.map((post) => {
      return [
        <ListItem button key={post.dateCreated} style={{ padding: '16px 0' }}>
          <ListItemIcon>
            <ImageEle />
          </ListItemIcon>

          <Grid container style={{ marginLeft: 16 }}>
            <Grid item xs={12}>
              <Typography variant="title" gutterBottom>
                {post.title}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                {post.description}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption">
                {`${post.city} - ${post.region} - ${new Date(post.dateCreated).toLocaleString()}`}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>,
        <Divider key={`${post.dateCreated}-divider`} />
      ];
    });

    return (
      <List>
        <Divider />
        {listElement}
      </List>
    );
  };

  render() {
    const { filteredData } = this.state;
    return (
      <div>
        {
          filteredData.today && filteredData.today.length > 0 ? (
            <div style={{ margin: '16px 0' }}>
              <Typography variant="title" gutterBottom>
                Today
              </Typography>

              {this.generateListEle(filteredData.today)}
            </div>
          ) : ''
        }

        {
          filteredData.yesterday && filteredData.yesterday.length > 0 ? (
            <div style={{ margin: '16px 0' }}>
              <Typography variant="title" gutterBottom>
                Yesterday
              </Typography>

              {this.generateListEle(filteredData.yesterday)}
            </div>
          ) : ''
        }

        <div style={{ margin: '16px 0' }}>
          <Typography variant="title" gutterBottom>
            Previous
          </Typography>

          {this.generateListEle(filteredData.older)}
        </div>
      </div>
    );
  }
}

ListView.propTypes = {
  province: PropTypes.string.isRequired
};

export default ListView;
