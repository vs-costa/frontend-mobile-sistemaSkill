import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import { useAuth } from '../api/AuthContext';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login}  />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          ...(isAuthenticated ? {} : { gestureEnabled: false, animationEnabled: false }),
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;