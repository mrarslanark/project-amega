import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../constants';

export type ProfileStackParamList = {
  [Routes.Profile]: {} | undefined;
};

export type ProfileProps = NativeStackScreenProps<
  ProfileStackParamList,
  Routes.Profile
>;
