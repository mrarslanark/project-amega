import React from 'react';
import {Text, View} from 'react-native';
import {DetailProps} from '../../navigation/DashboardStack/types';

const Detail: React.FC<DetailProps> = (): React.JSX.Element => {
  return (
    <View>
      <Text>Detail Screen</Text>
    </View>
  );
};

export default Detail;
