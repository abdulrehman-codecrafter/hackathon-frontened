/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import AuthContextProvider from './src/contexts/AuthContext';
import { ToastContextProvider } from './src/contexts/ToastContext';



export default function Main() {
  return (
    <AuthContextProvider>
      <PaperProvider >
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </PaperProvider>
    </AuthContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
