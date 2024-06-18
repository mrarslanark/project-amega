import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
    </SafeAreaView>
  );
};

export default App;
