import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type ProfileStackParamList = {
  Profile: {} | undefined;
};

export type ProfileProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Profile'
>;
