import React from 'react';
import {Text, View} from 'react-native';
import {DashboardProps} from '../../navigation/DashboardStack/types';

const Dashboard: React.FC<DashboardProps> = (): React.JSX.Element => {
  return (
    <View>
      <Text>Dashboard Screen</Text>
    </View>
  );
};

export default Dashboard;
