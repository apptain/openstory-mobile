import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Dimensions, StyleSheet } from "react-native";
import { connect } from "react-redux";

class StoryView extends Component {
  render() {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    const imageWidth = deviceWidth;
    const imageHeight = imageWidth * .66;

    return (
      <View style={styles.container}>
        <Image
          style={{width: imageWidth, height: imageHeight}}
          source={{uri: this.props.story.BlobImagePath}}
        />
        <Text style={styles.title}>
          {this.props.story.Title}
        </Text>
        <Text>
          {this.props.story.Content}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    // marginBottom: 30,
    // textAlign: 'center', // <-- the magic
    // fontWeight: 'bold',
    // fontSize: 18,
    // marginTop: 0,
    // width: 200,
    // backgroundColor: 'yellow'
  }
})

var mapStateToProps = function (state) {
  return {
    story: state.story.story
  }
}

var mapDispatchToProps = function (dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryView);



