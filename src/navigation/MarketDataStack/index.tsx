import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MarketData from '../../screens/MarketData';
import {MarketDataStackParamList} from './types';

const Stack = createNativeStackNavigator<MarketDataStackParamList>();

const MarketDataStack: React.FC = (): React.JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarketData"
        component={MarketData}
        options={{title: 'Market Data'}}
      />
    </Stack.Navigator>
  );
};

export default MarketDataStack;
