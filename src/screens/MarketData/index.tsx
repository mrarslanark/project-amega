import React from 'react';
import {Text, View} from 'react-native';
import {MarketDataProps} from '../../navigation/MarketDataStack/types';

const MarketData: React.FC<MarketDataProps> = (): React.JSX.Element => {
  return (
    <View>
      <Text>Market Data Screen</Text>
    </View>
  );
};

export default MarketData;
