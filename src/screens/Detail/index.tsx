import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {DetailProps} from '../../navigation/DashboardStack/types';
import {styles} from './styles';

const Detail: React.FC<DetailProps> = ({route}): React.JSX.Element => {
  const {imageId} = route.params;

  return (
    <View>
      <Image source={imageId as ImageSourcePropType} style={styles.image} />
    </View>
  );
};

export default Detail;
