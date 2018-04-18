import React, { Component } from "react";
import { Text, View, Image, Linking,  Platform, StyleSheet} from "react-native";
import { Card,
  CardCover,
} from 'react-native-paper';
import LabeledText from "../../components/LabeledText";

import { profileGet } from "../../apiCalls";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions";

class Profile extends Component {
  componentDidMount(){
    this.props.profileGet(profileGet, this.props.jwt);
  };

  render() {
    const user = this.props.user;
    if(user){
      return (
        <View style={styles.container}>
          <Card>
            <CardCover source={require('../../assets/anonymous-avatar.png')} />
          </Card>
          <View style={styles.formContainer}>
            <LabeledText label="Handle" value={user.handle || user.facebookHandle || user.twitterHandle} />
            <LabeledText label="Member Since" value={user.dateCreated} />
          </View>
        </View>
      );
    }
    return (<View></View>);
  }
}

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
  }
});

var mapStateToProps = function(state) {
  return {
    jwt: state.auth.jwt,
    user: state.auth.user
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    profileGet(apiCall, jwt) {
      dispatch(authActions.profileGet(apiCall, jwt));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

