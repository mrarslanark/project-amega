import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {DashboardProps} from '../../navigation/DashboardStack/types';
import DetailSection from '../../sections/DetailSection';
import IntroductionSection from '../../sections/IntroductionSection';
import WhoIs, {type NetworkDetails} from '../../services/WhoIs';
import {styles} from './styles';

const Dashboard: React.FC<DashboardProps> = (): React.JSX.Element => {
  const [ipInput, setIPInput] = useState('');
  const [ipInputError, setIPInputError] = useState<string | null>(null);

  const [details, setDetails] = useState<NetworkDetails[] | null>(null);

  const handleIPSearch = useCallback(async () => {
    try {
      if (ipInputError) {
        setIPInputError(null);
      }
      const whois = new WhoIs();
      const result = await whois.getDetails(ipInput);
      setDetails(result);
    } catch (err) {
      setIPInput('Unable to fetch details');
      console.warn(err);
    }
  }, [ipInput, ipInputError]);

  useEffect(() => {
    if (!details) {
      handleIPSearch();
    }
  }, [details, handleIPSearch]);

  return (
    <View style={styles.wrapper}>
      <IntroductionSection />
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
      <DetailSection details={details} />
    </View>
  );
};

export default Dashboard;
