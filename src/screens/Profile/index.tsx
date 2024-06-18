import React from 'react';
import {Text, View} from 'react-native';
import {ProfileProps} from '../../navigation/ProfileStack/types';

const Profile: React.FC<ProfileProps> = (): React.JSX.Element => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};

export default Profile;
