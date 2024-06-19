import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Images} from '../../constants';
import {styles} from './styles';

const GallerySection: React.FC = (): React.JSX.Element => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.wrapper}>
      <Carousel
        width={width}
        height={width / 2}
        autoPlay={false}
        data={Images.Gallery}
        mode="parallax"
        scrollAnimationDuration={1000}
        renderItem={({item}) => (
          <Image source={item} style={styles.image} resizeMode="cover" />
        )}
      />
    </View>
  );
};

export default GallerySection;
