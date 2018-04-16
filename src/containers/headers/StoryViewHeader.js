import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";

import {
  Toolbar,
  ToolbarContent,
  ToolbarBackAction
} from 'react-native-paper';

class StoryViewHeader extends Component {
  render() {
    return (
      <Toolbar>
        <ToolbarBackAction onPress={() => { this.props.navigation.navigate("StoriesList")}} />
        <ToolbarContent title={this.props.story.Title }/>
      </Toolbar>
    )
  }
}

var mapStateToProps = function (state) {
  return {
    story: state.story.story
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryViewHeader);



