import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, ListRenderItem, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Text from '../../components/Text';
import {MarketDataProps} from '../../navigation/MarketDataStack/types';
import GraphLoadingSection from '../../sections/GraphLoadingSection';
import {styles} from './styles';
import ListItem from '../../components/ListItem';

export interface TradeDetail {
  eventType: string;
  symbol: string;
  price: string;
  quantity: string;
}

const MarketData: React.FC<MarketDataProps> = (): React.JSX.Element => {
  const dataListRef = useRef<FlatList>(null);

  const [data, setData] = useState<TradeDetail[]>([]);
  const dataBufferRef = useRef<TradeDetail[]>([]);

  const [priceData, setPriceData] = useState<number[]>([]);
  const priceDataBufferRef = useRef<number[]>([]);

  const socketRef = useRef<WebSocket | null>(null);

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
        setPriceData((prevData: number[]) => [
          ...prevData,
          ...priceDataBufferRef.current,
        ]);

        priceDataBufferRef.current = [];
      }

      if (dataBufferRef.current.length > 0) {
        setData((prevData: TradeDetail[]) => [
          ...prevData,
          ...dataBufferRef.current,
        ]);

        dataBufferRef.current = [];
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.length > 500) {
      setData(prevData => prevData.slice(-250));
    }

    if (priceData.length > 1000) {
      setPriceData(prevData => prevData.slice(-500));
    }
  }, [data, priceData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dataListRef.current) {
        dataListRef.current.scrollToEnd({animated: true});
      }
    }, 1_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [data]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.graphWrapper}>
        <Text variant="heading">Price Graph</Text>
        {priceData.length > 0 ? (
          <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: priceData,
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
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
          />
        ) : (
          <GraphLoadingSection />
        )}
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          ref={dataListRef}
          data={data}
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
