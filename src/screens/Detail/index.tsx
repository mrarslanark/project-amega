import React, {useContext} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {DetailProps} from '../../navigation/DashboardStack/types';
import {styles} from './styles';
import DetailSection from '../../sections/DetailSection';
import {NetworkContext} from '../../providers/NetworkProvider';

const Detail: React.FC<DetailProps> = ({route}): React.JSX.Element => {
  const {network} = useContext(NetworkContext);
  const {imageId} = route.params;

  return (
    <View>
      <Image source={imageId as ImageSourcePropType} style={styles.image} />
      <DetailSection details={network} />
    </View>
  );
};

export default Detail;
