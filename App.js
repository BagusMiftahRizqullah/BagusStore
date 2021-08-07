import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Router from './Router';
import {Store} from './src/Store/Store';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';

const App = () => {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
