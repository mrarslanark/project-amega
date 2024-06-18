import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {DashboardProps} from '../../navigation/DashboardStack/types';
import WhoIs, {type NetworkDetails} from '../../services/WhoIs';

const Dashboard: React.FC<DashboardProps> = (): React.JSX.Element => {
  const [ipInput, setIPInput] = useState('');
  const [details, setDetails] = useState<NetworkDetails | null>(null);

  const handleIPSearch = async () => {
    try {
      // Retrieve the IP Address and call the API
      const whois = new WhoIs();
      const result = await whois.getDetails(ipInput);
      setDetails(result);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <Text>IP Tracker</Text>
      <Text>Input an IP Address</Text>
      <TextInput
        keyboardType="decimal-pad"
        placeholder="Enter IP Address"
        onChangeText={setIPInput}
        returnKeyType="done"
      />
      <Button onPress={handleIPSearch} title="Search" />
      <Text>IP Address: {details?.ipAddress ?? ''}</Text>
      <Text>Location: {details?.location ?? ''}</Text>
      <Text>Timezone: {details?.timezone ?? ''}</Text>
      <Text>ISP: {details?.isp ?? ''}</Text>
    </View>
  );
};

export default Dashboard;
