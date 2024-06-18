import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Input from '../../components/Input';
import Text from '../../components/Text';
import {DashboardProps} from '../../navigation/DashboardStack/types';
import WhoIs, {type NetworkDetails} from '../../services/WhoIs';
import {styles} from './styles';

const Dashboard: React.FC<DashboardProps> = (): React.JSX.Element => {
  const [ipInput, setIPInput] = useState('');
  const [ipInputError, setIPInputError] = useState<string | null>(null);
  const [details, setDetails] = useState<NetworkDetails | null>(null);

  const handleIPSearch = useCallback(async () => {
    try {
      if (ipInputError) {
        setIPInputError(null);
      }
      // Retrieve the IP Address and call the API
      const whois = new WhoIs();
      const result = await whois.getDetails(ipInput);
      setDetails(result);
    } catch (err) {
      setIPInput('Unable to fetch details');
      console.warn(err);
    }
  }, [ipInput, ipInputError]);

  useEffect(() => {
    if (details === null) {
      handleIPSearch();
    }
  }, [details, handleIPSearch]);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.introWrapper}>
        <Text variant="heading">IP Tracker</Text>
        <Text variant="subtitle">
          Find details from an IP Address. Start by searching for an IP Address
          below.
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <Input
          keyboardType="decimal-pad"
          placeholder="Enter IP Address"
          onChangeText={setIPInput}
          returnKeyType="done"
          onSubmitEditing={handleIPSearch}
          error={ipInputError}
        />
      </View>
      <View style={styles.introWrapper}>
        <Text>IP Address: {details?.ipAddress ?? ''}</Text>
        <Text>Location: {details?.location ?? ''}</Text>
        <Text>Timezone: {details?.timezone ?? ''}</Text>
        <Text>ISP: {details?.isp ?? ''}</Text>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
