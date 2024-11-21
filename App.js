import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GraphScreen from './screens/GraphScreen';
import RecoverScreen from './screens/RecoverScreen';
import BotaoIOT from './screens/BotaoIOT.js';
import SelectScreen from './screens/SelectScreen.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="BotaoIOT" component={BotaoIOT} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="GraphScreen" component={GraphScreen} />
        <Stack.Screen name="RecoverScreen" component={RecoverScreen} /> 
        <Stack.Screen name="SelectScreen" component={SelectScreen} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}
