import React, {useContext} from 'react';
import {Image, View} from 'react-native';
import {Images} from '../../constants';
import {ProfileProps} from '../../navigation/ProfileStack/types';
import {NetworkContext} from '../../providers/NetworkProvider';
import DetailSection from '../../sections/DetailSection';

const Profile: React.FC<ProfileProps> = (): React.JSX.Element => {
  const {network} = useContext(NetworkContext);

  return (
    <View style={{padding: 16, flex: 1, backgroundColor: 'white', rowGap: 12}}>
      <Image
        source={Images.Gallery[0]}
        style={{width: '100%', height: '50%', borderRadius: 12}}
      />
      <DetailSection details={network} />
    </View>
  );
};

export default Profile;
