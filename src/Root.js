import React, { Component } from "react";
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Routes from "./Routes";
import configureStore from "./redux/configureStore";

export default class Root extends Component {
  state: {
    store: Object,
    isLoading: boolean,
    isReady: boolean
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
  }
  render() {
    //disable yellow box warnings
    console.disableYellowBox = true;
    let { store, persistor } = configureStore();

    const theme = {
      ...DefaultTheme,
      roundness: 2,
      fonts: {

      },
      colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
      }
    };

    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes/>
          </PersistGate>
        </Provider>
      </PaperProvider>
    );
  }
}
