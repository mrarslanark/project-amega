import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../../screens/Profile';
import {ProfileStackParamList} from './types';
import {Routes} from '../../constants';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = (): React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={Routes.Profile}>
      <Stack.Screen
        name={Routes.Profile}
        component={Profile}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
