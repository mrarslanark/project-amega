import React from 'react';
import {View} from 'react-native';
import {TradeDetail} from '../../screens/MarketData';
import Text from '../Text';
import {styles} from './styles';

const ListItem: React.FC<TradeDetail> = ({
  eventType,
  symbol,
  price,
  quantity,
}): React.JSX.Element | null => {
  if (!eventType || !symbol || !price || !quantity) {
    return null;
  }

  const dollars = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  });

  return (
    <View style={styles.wrapper}>
      <Text variant="medium">{eventType}</Text>
      <Text variant="medium">{symbol}</Text>
      <Text variant="medium">{dollars.format(Number(price))}</Text>
      <Text variant="medium">{quantity}</Text>
    </View>
  );
};

export default ListItem;
