import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {DashboardProps} from '../../navigation/DashboardStack/types';
import DetailSection from '../../sections/DetailSection';
import GallerySection from '../../sections/GallerySection';
import IntroductionSection from '../../sections/IntroductionSection';
import WhoIsService, {type NetworkDetails} from '../../services/WhoIs';
import {styles} from './styles';
import {Routes} from '../../constants';

const Dashboard: React.FC<DashboardProps> = ({
  navigation,
}): React.JSX.Element => {
  const [ipInput, setIPInput] = useState('');
  const [ipInputError, setIPInputError] = useState<string | null>(null);

  const [details, setDetails] = useState<NetworkDetails[] | null>(null);

  const handleIPSearch = useCallback(async () => {
    try {
      if (ipInputError) {
        setIPInputError(null);
      }
      const whois = new WhoIsService();
      const result = await whois.getDetails(ipInput, details);
      if (result) {
        setDetails(result);
      }
    } catch (err) {
      setIPInput('Unable to fetch details');
      console.warn(err);
    }
  }, [ipInput, ipInputError, details]);

  useEffect(() => {
    if (!details) {
      handleIPSearch();
    }
  }, [details, handleIPSearch]);

  const handleImagePress = (imageId: string) => {
    navigation.navigate(Routes.Detail, {imageId});
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
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
      <GallerySection onPressImage={handleImagePress} />
    </ScrollView>
  );
};

export default Dashboard;
