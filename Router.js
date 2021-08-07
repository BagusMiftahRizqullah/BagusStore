import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Screen
import {Register, Login, Detail} from './src/Screen/Screen';
import BottomNav from './src/Component/BottomNav';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Mainapp"
          component={mainApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mainApp = () => {
  return <BottomNav />;
};

export default Router;

const styles = StyleSheet.create({});
