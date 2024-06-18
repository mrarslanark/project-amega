import React from 'react';
import {View} from 'react-native';
import Text from '../../components/Text';
import {styles} from './styles';

interface DetailItem {
  title: string;
  value?: string;
}

const DetailItem: React.FC<DetailItem> = ({
  title,
  value,
}): React.JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Text variant="title">{title}</Text>
      <Text variant="medium" numberOfLines={1}>
        {value ?? 'Unkown'}
      </Text>
    </View>
  );
};

export default DetailItem;
