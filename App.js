import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Welcome from './src/screens/Welcome';
import Signin from './src/screens/SignIn';
import Signup from './src/screens/SignUp';
import Home from './src/screens/Home';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const App = () => {
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(User) {
    setUser(User);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <>
            <Stack.Screen name="home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
