import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Text from '../../components/Text';
import {styles} from './styles';

const GraphLoadingSection: React.FC = (): React.JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size={'small'} color={'teal'} />
      <Text>Loading Price Graph...</Text>
    </View>
  );
};

export default GraphLoadingSection;
