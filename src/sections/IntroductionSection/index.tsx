import React from 'react';
import {View} from 'react-native';
import Text from '../../components/Text';
import {styles} from './styles';

const IntroductionSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text variant="heading">IP Tracker</Text>
      <Text variant="subtitle">
        Find details from an IP Address. Start by searching for an IP Address
        below.
      </Text>
    </View>
  );
};

export default IntroductionSection;
