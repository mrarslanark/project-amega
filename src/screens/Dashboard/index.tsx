import React, {useCallback, useEffect, useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {DashboardProps} from '../../navigation/DashboardStack/types';
import WhoIs, {type NetworkDetails} from '../../services/WhoIs';
import {styles} from './styles';
import Text from '../../components/Text';

const Dashboard: React.FC<DashboardProps> = (): React.JSX.Element => {
  const [ipInput, setIPInput] = useState('');
  const [details, setDetails] = useState<NetworkDetails | null>(null);

  const handleIPSearch = useCallback(async () => {
    try {
      // Retrieve the IP Address and call the API
      const whois = new WhoIs();
      const result = await whois.getDetails(ipInput);
      setDetails(result);
    } catch (err) {
      console.warn(err);
    }
  }, [ipInput]);

  useEffect(() => {
    if (details === null) {
      handleIPSearch();
    }
  }, [details, handleIPSearch]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.introWrapper}>
        <Text variant="heading">IP Tracker</Text>
        <Text variant="subtitle">
          Find details from an IP Address. Start by searching for an IP Address
          below.
        </Text>
      </View>
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
