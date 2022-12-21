import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import FeedHome from './Feed';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';
import Map from './Map';

const Tab = createMaterialBottomTabNavigator();
const Home = () => {
  useEffect(() => {
    console.log(auth().currentUser);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={20} />
          ),
        }}
        name="Feed"
        component={FeedHome}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="location" color={color} size={20} />
          ),
        }}
        name="Locate"
        component={Map}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={20} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default Home;
