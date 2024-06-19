import React, {useContext} from 'react';
import {Image, View} from 'react-native';
import {Images} from '../../constants';
import {ProfileProps} from '../../navigation/ProfileStack/types';
import {NetworkContext} from '../../providers/NetworkProvider';
import DetailSection from '../../sections/DetailSection';
import {styles} from './styles';

const Profile: React.FC<ProfileProps> = (): React.JSX.Element => {
  const {network, image} = useContext(NetworkContext);

  return (
    <View style={styles.wrapper}>
      <Image source={image ? image : Images.Gallery[0]} style={styles.image} />
      <DetailSection details={network} />
    </View>
  );
};

export default Profile;
