import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/screens/home';
import Splash from './src/screens/splash';
import Details from './src/screens/details';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
