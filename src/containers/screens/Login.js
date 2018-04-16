import React, { Component } from "react";
import { Text, View, Image, Linking,  Platform, StyleSheet} from "react-native";
import { connect } from "react-redux";

import SafariView from 'react-native-safari-view';
import IconFA from 'react-native-vector-icons/FontAwesome';

import {authActions} from "../../redux/actions";
import {facebookLoginUrl, twitterLoginUrl} from "../../apiCalls/endpoints";

class Login extends Component {
  state = {
    selectedProvider: null
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({url}) => {
    // Extract stringified user string out of the URL
    const [, token] = url.match(/token=([^#]+)/);
    this.props.oAuthLoginSuccess(token, this.state.selectedProvider);
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('facebook', facebookLoginUrl);

  // Handle Login with Twitter button tap
  loginWithTwitter = () => this.openURL('twitter', twitterLoginUrl);

  // Open URL in a browser
  openURL = (provider, url) => {
    this.setState({
      selectedProvider: provider
    });
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }

    this.props.oAuthLoginRequested(provider);
  };

  render() {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.header}>
              OpenStory uses Twitter and Facebook authentication to tell the story so far
            </Text>
            <Text style={styles.text}>
              Please select one of these login options.
            </Text>
            <View style={styles.buttonContainer}>
              <IconFA.Button
                name="facebook"
                backgroundColor="#3b5998"
                onPress={this.loginWithFacebook}
                style={styles.iconStyles}
              >
                Login with Facebook
              </IconFA.Button>
            </View>
            <View style={styles.buttonContainer}>
              <IconFA.Button
                name="twitter"
                backgroundColor="#DD4B39"
                onPress={this.loginWithTwitter}
                style={styles.iconStyles}
              >
                Or with Twitter
              </IconFA.Button>
            </View>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    paddingTop:20,
    alignItems: 'center',
  },
  iconStyles: {
    width: 200,
    height: 40
  }
});

var mapStateToProps = function(state) {
  return {
    user: state.auth.user
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
    oAuthLoginRequested(provider) {
      dispatch(authActions.oAuthLoginRequested(provider));
    },
    oAuthLoginSuccess(getMeApiCall, jwt, provider) {
      dispatch(authActions.oAuthLoginSuccess(getMeApiCall, jwt, provider));
    },
    oAuthLoginFailure(provider) {
      dispatch(authActions.oAuthLoginSuccess(provider));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

