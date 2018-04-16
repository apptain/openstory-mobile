import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";

import {
  Toolbar,
  ToolbarContent
} from 'react-native-paper';


class StoryListHeader extends Component {
  render() {
    return (
      <Toolbar>
        <ToolbarContent title="OPENSTORY" />
      </Toolbar>
    )
  }
}

//TODO: Use redux to add search bar for sending search params to server
var mapStateToProps = function (state) {
  return {

  }
}

var mapDispatchToProps = function (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryListHeader);


