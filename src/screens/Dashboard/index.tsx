import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {DashboardProps} from '../../navigation/DashboardStack/types';

const Dashboard: React.FC<DashboardProps> = (): React.JSX.Element => {
  const [ipAddress, setIPAddress] = useState('');

  const handleIPSearch = () => {
    console.log(ipAddress);
  };

  return (
    <View>
      <Text>IP Tracker</Text>
      <Text>Input an IP Address</Text>
      <TextInput
        keyboardType="decimal-pad"
        placeholder="Enter IP Address"
        onChangeText={setIPAddress}
        returnKeyType="done"
      />
      <Button onPress={handleIPSearch} title="Search" />
      <Text>Current User Details</Text>
      <Text>IP Address: 0.0.0.0</Text>
      <Text>Location: California, U.S.A</Text>
      <Text>Timezone: UTC +04:00</Text>
      <Text>ISP: Cloudflare</Text>
    </View>
  );
};

export default Dashboard;
