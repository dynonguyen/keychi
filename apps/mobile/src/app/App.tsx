import React from 'react';
import { Text } from 'react-native';
import ThemeProvider from '../components/ThemeProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <Text>Hello Keychi</Text>
    </ThemeProvider>
  );
};

export default App;
