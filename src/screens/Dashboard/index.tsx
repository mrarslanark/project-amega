import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Routes} from '../../constants';
import {DashboardProps} from '../../navigation/DashboardStack/types';
import {NetworkContext} from '../../providers/NetworkProvider';
import DetailSection from '../../sections/DetailSection';
import GallerySection from '../../sections/GallerySection';
import IntroductionSection from '../../sections/IntroductionSection';
import WhoIsService from '../../services/WhoIs';
import {styles} from './styles';

const Dashboard: React.FC<DashboardProps> = ({
  navigation,
}): React.JSX.Element => {
  const {network, updateNetworkDetails, updateImage} =
    useContext(NetworkContext);
  const [ipInput, setIPInput] = useState('');
  const [ipInputError, setIPInputError] = useState<string | null>(null);

  const handleIPSearch = useCallback(async () => {
    try {
      if (ipInputError) {
        setIPInputError(null);
      }
      const whois = new WhoIsService();
      const result = await whois.getDetails(ipInput, network);
      if (result) {
        updateNetworkDetails(result);
      }
    } catch (err) {
      setIPInput('Unable to fetch details');
      console.warn(err);
    }
  }, [ipInputError, ipInput, network, updateNetworkDetails]);

  useEffect(() => {
    if (!network) {
      handleIPSearch();
    }
  }, [handleIPSearch, network]);

  const handleImagePress = (imageId: string) => {
    updateImage(imageId);
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
      <DetailSection details={network} />
      <GallerySection onPressImage={handleImagePress} />
    </ScrollView>
  );
};

export default Dashboard;
