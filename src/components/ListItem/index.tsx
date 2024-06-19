import React from 'react';
import {View} from 'react-native';
import {TradeDetail} from '../../screens/MarketData';
import Text from '../Text';
import {styles} from './styles';
import dayjs from 'dayjs';

interface ListItemProps extends TradeDetail {
  useAsHeader?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  useAsHeader = false,
  eventTime,
  is_market_maker,
  price,
  quantity,
}): React.JSX.Element | null => {
  if ((!eventTime || !price || !quantity) && !useAsHeader) {
    return null;
  }

  const dollars = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.textWrapper}>
        <Text variant="medium">
          {useAsHeader ? 'Event Time' : dayjs(eventTime).format('hh:mm:ss')}
        </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text variant="medium">
          {useAsHeader ? 'Market Maker' : is_market_maker ? 'Yes' : 'No'}
        </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text variant="medium">
          {useAsHeader ? 'Price Change' : dollars.format(Number(price))}
        </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text variant="medium">{useAsHeader ? 'Quantity' : quantity}</Text>
      </View>
    </View>
  );
};

export default ListItem;
