import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import {Home, Cart} from '../Screen/Screen';

const Bot = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Bot.Navigator initialRouteName="Home">
      <Bot.Screen
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Foundation
              name="home"
              size={30}
              color={focused ? '#000000' : '#C3CADE'}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Bot.Screen
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Feather
              name="shopping-cart"
              size={30}
              color={focused ? '#000000' : '#C3CADE'}
            />
          ),
        }}
        name="Cart"
        component={Cart}
      />
    </Bot.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
