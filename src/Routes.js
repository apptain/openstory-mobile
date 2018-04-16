import React, {Component} from 'react';
import { Platform, Animated, Easing, Text } from "react-native";
import { Icon } from "react-native-elements";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import { connect } from 'react-redux';

import StoriesList from "./containers/screens/StoriesList";
import StoryForm from "./containers/screens/StoryForm";
import StoryView from "./containers/screens/StoryView";
import Login from "./containers/screens/Login";
import Profile from "./containers/screens/Profile";

import { StoryListHeader, StoryViewHeader, StoryFormHeader, ProfileHeader } from './containers/headers';

const tabBarIcon = (nameInactive, nameActive) => ({ tintColor, focused }) => (
  <Icon name={focused ? nameActive : nameInactive} size={26} color={"#000"} />
);

//Custom Nav Transform Example
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })
      return { transform: [ { translateX } ] }
    },
  }
}

const StoriesStack = StackNavigator({
  StoriesList: {
    screen: StoriesList,
    path: '/',
    navigationOptions: ({navigation}) => ({
      header: <StoryListHeader navigation={navigation}/>
    })
  },
  StoryView: {
    screen: StoryView,
    path: '/stories/:title',
    navigationOptions: ({navigation}) => ({
      header: <StoryViewHeader navigation={navigation}/>
    })
  }}, {
  ...TabNavigator.Presets.AndroidTopTabs,
  animationEnabled: false,
  swipeEnabled: true,
  transitionConfig
});

const StoryFormStack = StackNavigator({
  StoryForm: {
    screen: StoryForm,
    path: '/',
    navigationOptions: ({navigation}) => ({
      header: <StoryFormHeader navigation={navigation}/>
    })
  },
});

const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile,
    path: '/',
    navigationOptions: ({navigation}) => ({
      header: <ProfileHeader navigation={navigation}/>
    })
  },
});

const tabConfig =  {
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  headerMode: 'none',
  animationEnabled: false,
  swipeEnabled: false,
  navigationOptions: {
    headerVisible: false,
  }
};

const AuthenticatedTabs = TabNavigator({
    StoriesList: {
      screen: StoriesStack,
      navigationOptions: {
        tabBarLabel: 'Stories',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
      },
    },
    StoryUpsert: {
      screen: StoryFormStack,
      navigationOptions: {
        tabBarLabel: "New Story",
        tabBarIcon: ({ tintColor }) => <Icon name="add" size={35} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => <Icon name="account-circle" size={35} color={tintColor}/>
      },
    }
  }, tabConfig);

const UnauthenticatedTabs = TabNavigator({
  StoriesList: {
    screen: StoriesStack,
    navigationOptions: {
      tabBarLabel: 'Stories',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: "Login",
      tabBarIcon: tabBarIcon("account-circle", "account-circle")
    }
  }
}, tabConfig);

class Routes extends Component {
  constructor (props) {
    super(props);
    this.state = { softKeys: false }
  }

  componentDidMount () {
    if (Platform.OS === 'android') {
      DetectNavbar.hasSoftKeys().then((softKeys) => {
        this.setState({ softKeys });
      });
    }
  }

  render () {
    let tabBarConfig = {
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false
    };

    if (Platform.OS === 'android') {
      tabBarConfig.tabBarComponent = NavigationComponent;
      tabBarConfig.tabBarOptions = {
        bottomNavigationOptions: {
          style: {
            height: this.state.softKeys ? 104 : 56
          },
          innerStyle: {
            paddingBottom: this.state.softKeys ? 48 : 0
          }
        }
      }
    }

    if(this.props.jwt){
      return <AuthenticatedTabs />
    }
    return <UnauthenticatedTabs />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  jwt: state.auth.jwt
});

export default connect(mapStateToProps)(Routes);