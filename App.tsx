import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Navigator from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
