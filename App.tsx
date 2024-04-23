import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes';
import { AuthProvider } from './src/api/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#c1c1c1" />
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}