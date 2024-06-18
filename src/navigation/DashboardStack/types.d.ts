import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../constants';

export type DashboardStackParamList = {
  [Routes.Dashboard]: {} | undefined;
  [Routes.Detail]: {} | undefined;
};

export type DashboardProps = NativeStackScreenProps<
  DashboardStackParamList,
  Routes.Dashboard
>;

export type DetailProps = NativeStackScreenProps<
  DashboardStackParamList,
  Routes.Detail
>;
