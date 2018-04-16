import React, { Component} from "react";

import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import { connect } from "react-redux";


import {storyActions} from "../../redux/actions";

import { TextInput,
  Card,
  CardCover
} from 'react-native-paper';

import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-picker';

class StoryForm extends Component {
  componentDidMount() {
    //Make content look like a multiline text input
    const multiline = this.refs['content'];
    multiline.setNativeProps({style: {  height:250 }});
  }

  selectPhoto() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.props.storyChange({...this.props.storyEdit,
          mediaUri: response.uri,
          base64ImageString: response.data
        });
      }
    });
  }

  storyChange(fieldName, value){
    this.props.storyChange({...this.props.storyEdit, [fieldName]: value});
  }
  imageCover(mediaUri, blobImagePath){
    if(mediaUri){
      return <CardCover source={{uri: mediaUri}} />
    } else if(blobImagePath) {
      return <CardCover source={{uri: blobImagePath}} />
    }
    else {
      return <CardCover source={require('../../assets/image-placeholder.png')} />
    }
  }

  render() {
    let { title, content, mediaUri, blobImagePath } = this.props.storyEdit;

    return (
      <View style={styles.container}>
        <Card>
          {this.imageCover(mediaUri, blobImagePath)}
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            autoInactive={true}
            style={styles.fab}
            onPress={() => { this.selectPhoto()}}
          />
        </Card>
        <View style={styles.formContainer}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={text => this.storyChange('title', text)}
          />
          <TextInput
            ref={"content"}
            multiline={true}
            numberOfLines={100}
            label="Content"
            value={content}
            onChangeText={text => this.storyChange('content', text)}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#FFF',
  },
  formContainer: {
    justifyContent: 'center',
    padding: 10,
  },
  fab: {
    alignSelf: 'flex-end'
  }
});

var mapStateToProps = function (state) {
  return {
    storyEdit: state.story.storyEdit
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    storyChange(storyEdit){
      dispatch(storyActions.storyChange(storyEdit));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm);



