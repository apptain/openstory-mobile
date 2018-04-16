import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";

import {storyActions} from "../../redux/actions";
import {storyUpsert}  from "../../apiCalls";

import {
  Toolbar,
  ToolbarContent,
  ToolbarAction
} from 'react-native-paper';

class StoryFormHeader extends Component {
  constructor (props) {
    super(props);
    this.clearStory = this.clearStory.bind(this);
    this.saveStory = this.saveStory.bind(this);
  }

  clearStory(){
    //TODO: Add modal confirmation
    this.props.storyChange({});
  }

  saveStory(){
    //TODO: At least show validation
    let { title, content, base64ImageString, blobImagePath } = this.props.storyEdit;
    if(!title) {
      throw "Title Required";
    }
    if(!content) {
      throw "Content Required";
    }
    if(!base64ImageString && !blobImagePath){
      throw "Image Required";
    }
    var data = Object.assign({}, this.props.storyEdit);
    this.props.storyUpsert(storyUpsert, data, this.props.jwt);
  }

  render() {
    return (
      <Toolbar>
        <ToolbarAction icon="close" onPress={() => { this.clearStory()}} />
        <ToolbarContent title={this.props.title} />
        <ToolbarAction icon="done" onPress={() => { this.saveStory()}} />
      </Toolbar>
    )
  }
};

var mapStateToProps = function (state) {
  return {
    title: state.story.story.id ? "UPDATE STORY" : "CREATE STORY",
    storyEdit: state.story.storyEdit,
    jwt: state.auth.jwt
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    storyChange(storyEdit){
      dispatch(storyActions.storyChange(storyEdit));
    },
    storyUpsert(apiCall, story, token) {
      dispatch(storyActions.storyUpsert(apiCall, story, token));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryFormHeader);



