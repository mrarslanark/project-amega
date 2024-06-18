import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MarketDataStackParamList = {
  MarketData: {} | undefined;
};

export type MarketDataProps = NativeStackScreenProps<
  MarketDataStackParamList,
  'MarketData'
>;
