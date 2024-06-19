import React, {useCallback, useEffect, useReducer, useRef} from 'react';
import {Dimensions, FlatList, ListRenderItem, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import ListItem from '../../components/ListItem';
import Text from '../../components/Text';
import {MarketDataProps} from '../../navigation/MarketDataStack/types';
import GraphLoadingSection from '../../sections/GraphLoadingSection';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';

export interface TradeDetail {
  eventType: string;
  symbol: string;
  price: string;
  quantity: string;
}

type ReducerStateType = {
  tradeInfo: TradeDetail[];
  prices: number[];
};

type ReducerActionType =
  | {type: 'update-data'; payload: TradeDetail[]}
  | {type: 'update-price'; payload: number[]}
  | {type: 'optimize-list'};

const initialState: ReducerStateType = {
  tradeInfo: [],
  prices: [],
};

const reducer = (state: ReducerStateType, action: ReducerActionType) => {
  switch (action.type) {
    case 'update-data':
      return {
        ...state,
        tradeInfo: [...state.tradeInfo, ...action.payload],
      };
    case 'update-price':
      return {
        ...state,
        prices: [...state.prices, ...action.payload],
      };
    case 'optimize-list':
      return {
        ...state,
        tradeInfo: state.tradeInfo.slice(0, 250),
        prices: state.prices.slice(0, 250),
      };
    default:
      return state;
  }
};

const MarketData: React.FC<MarketDataProps> = (): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dataListRef = useRef<FlatList>(null);
  const dataBufferRef = useRef<TradeDetail[]>([]);
  const priceDataBufferRef = useRef<number[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (dataListRef.current) {
        dataListRef.current.scrollToEnd();
      }
    }, []),
  );

  useEffect(() => {
    socketRef.current = new WebSocket(
      'wss://stream.binance.com:443/ws/btcusdt',
    );
    socketRef.current.onopen = () => {
      if (socketRef.current) {
        socketRef.current.send(
          JSON.stringify({
            method: 'SUBSCRIBE',
            params: ['btcusdt@aggTrade'],
            id: 1,
          }),
        );
      }
    };

    socketRef.current.onmessage = ev => {
      const parsed = JSON.parse(ev.data);
      const {e, s, p, q} = parsed;
      dataBufferRef.current.push({
        eventType: e,
        symbol: s,
        price: p,
        quantity: q,
      });
      const convertedPrice = parseFloat(p);
      if (!isNaN(convertedPrice)) {
        priceDataBufferRef.current.push(convertedPrice);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (priceDataBufferRef.current.length > 0) {
        dispatch({type: 'update-price', payload: priceDataBufferRef.current});
        priceDataBufferRef.current = [];
      }

      if (dataBufferRef.current.length > 0) {
        dispatch({type: 'update-data', payload: dataBufferRef.current});
        dataBufferRef.current = [];
      }
    }, 5_000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state.prices.length > 1000 || state.tradeInfo.length > 1000) {
      dispatch({type: 'optimize-list'});
    }
  }, [state.prices.length, state.tradeInfo.length]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dataListRef.current) {
        dataListRef.current.scrollToEnd();
      }
    }, 1_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state.tradeInfo]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.graphWrapper}>
        <View style={styles.introWrapper}>
          <Text variant="heading">Price Graph</Text>
          <Text variant="subtitle">BTCUSDT | aggTrade</Text>
        </View>
        {state.prices.length > 0 ? (
          <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: state.prices,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withHorizontalLines={false}
            withVerticalLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withScrollableDot={false}
            withShadow={true}
            bezier
            style={styles.graphStyle}
            chartConfig={{
              linejoinType: 'miter',
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            }}
          />
        ) : (
          <GraphLoadingSection />
        )}
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          ref={dataListRef}
          data={state.tradeInfo}
          keyExtractor={_keyExtractor}
          contentContainerStyle={styles.listContentContainerStyle}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={20}
          inverted={true}
          removeClippedSubviews={true}
          getItemLayout={_getItemLayout}
          renderItem={_renderItem}
        />
      </View>
    </View>
  );
};

export default MarketData;

const _keyExtractor = (_: any, index: number) => String(index);

const _getItemLayout = (
  _: ArrayLike<TradeDetail> | null | undefined,
  index: number,
) => ({
  index,
  length: 24,
  offset: 24 * index,
});

const _renderItem: ListRenderItem<TradeDetail> = ({item}) => {
  return <ListItem {...item} />;
};
