import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Navigator from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
