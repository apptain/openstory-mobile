import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";

import {
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  ToolbarBackAction,
  Colors, Caption, SearchBar, withTheme
} from 'react-native-paper';

class ProfileHeader extends Component {
  render() {
    if(this.props.user) {
      return (
        <Toolbar>
          <ToolbarContent title={this.props.user.handle}/>
        </Toolbar>
      )
    }
    return (<View></View>);
  }
}

var mapStateToProps = function (state) {
  return {
    user: state.auth.user
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);



