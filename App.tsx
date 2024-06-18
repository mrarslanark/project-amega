import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <Text>React Native</Text>
    </SafeAreaView>
  );
};

export default App;
