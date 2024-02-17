import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme

import Home from './src/screens/home';
import Splash from './src/screens/splash';
import Details from './src/screens/details';
import Perfil from './src/screens/perfil';
import Login from './src/screens/login';
import Exercises from './src/screens/exercises';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Group
            screenOptions={{
              presentation: 'formSheet',
              gestureEnabled: false,
              headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Exercises" component={Exercises} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Perfil" component={Perfil} />
          </Stack.Group>
        </Stack.Navigator>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;
