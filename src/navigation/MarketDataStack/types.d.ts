import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../constants';

export type MarketDataStackParamList = {
  [Routes.MarketData]: {} | undefined;
};

export type MarketDataProps = NativeStackScreenProps<
  MarketDataStackParamList,
  Routes.MarketData
>;
