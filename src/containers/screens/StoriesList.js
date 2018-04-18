import React, { Component } from "react";
import PropTypes from 'prop-types';

import { Text, View, StyleSheet } from "react-native";
import {
  Right,
  Body,
  List,
  ListItem
} from "native-base";

import { ListView, withTheme } from 'react-native-paper';;
import { connect } from "react-redux";

import {storiesGet} from "../../apiCalls";
import {storyActions} from "../../redux/actions";

const styles = StyleSheet.create({
  headerText: {
    margin: 14,
  },
});

class StoriesList extends Component {
  componentDidMount(){
		this.props.getStoriesList(storiesGet, this.props.filter);
  };

  navigateToStory(story){
    this.props.storySelect(story);
    this.props.navigation.navigate('StoryView', {story});
  };

  render() {
    return (
      <View>
        <List
          removeClippedSubviews={false}
          dataArray={this.props.stories}
          renderRow={dataRow =>
            <ListItem
              onPress={this.navigateToStory.bind(this, dataRow)}
              button
              thumbnail
            >
            <Body>
            <Text style={styles.title}>
              {dataRow.Title}
            </Text>
            <Text style={styles.content}>
              {dataRow.Content}
            </Text>
            </Body>
            <Right
              style={{ flexDirection: "row", alignItems: "flex-start" }}
            >
              <Text style={styles.timeText}>
                {dataRow.time}
              </Text>
            </Right>
          </ListItem>
          }
        />
      </View>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    stories: state.story.stories,
    filter: state.story.filter
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
    getStoriesList(apiCall, filter) {
      dispatch(storyActions.storiesGet(apiCall, filter));
    },
    storySelect(story) {
      dispatch(storyActions.storySelect(story));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);