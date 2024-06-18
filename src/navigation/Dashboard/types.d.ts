import {NativeStackScreenProps} from '@react-navigation/native-stack';

type DashboardStackParamList = {
  Dashboard: {} | undefined;
  Detail: {} | undefined;
};

export type DashboardProps = NativeStackScreenProps<
  DashboardStackParamList,
  'Dashboard'
>;

export type DetailProps = NativeStackScreenProps<
  DashboardStackParamList,
  'Detail'
>;
