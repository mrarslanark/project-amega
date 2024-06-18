import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Input from '../../components/Input';
import Text from '../../components/Text';
import {DashboardProps} from '../../navigation/DashboardStack/types';
import WhoIs, {type NetworkDetails} from '../../services/WhoIs';
import {styles} from './styles';
import Button from '../../components/Button';
import DetailItem from '../../components/DetailItem';

const Dashboard: React.FC<DashboardProps> = (): React.JSX.Element => {
  const [ipInput, setIPInput] = useState('');
  const [ipInputError, setIPInputError] = useState<string | null>(null);
  const [details, setDetails] = useState<NetworkDetails[] | null>(null);

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
    <View style={styles.wrapper}>
      <View style={styles.introWrapper}>
        <Text variant="heading">IP Tracker</Text>
        <Text variant="subtitle">
          Find details from an IP Address. Start by searching for an IP Address
          below.
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <Input
          keyboardType={'decimal-pad'}
          placeholder={'Search for any IP address'}
          onChangeText={setIPInput}
          returnKeyType={'done'}
          onSubmitEditing={handleIPSearch}
          error={ipInputError}
        />
        <Button
          disabled={ipInput.trim().length === 0}
          variant="primary"
          onPress={handleIPSearch}>
          SEARCH
        </Button>
      </View>
      {details && (
        <View style={styles.detailWrapper}>
          <FlatList
            numColumns={2}
            data={details}
            columnWrapperStyle={styles.columnStyle}
            contentContainerStyle={styles.contentStyle}
            keyExtractor={item => item.title}
            renderItem={({item}) => {
              return <DetailItem title={item.title} value={item.value} />;
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Dashboard;
