import React from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Images} from '../../constants';
import {styles} from './styles';

interface GallerySectionProps {
  onPressImage: (imageId: string) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  onPressImage,
}): React.JSX.Element => {
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressImage(item)}>
            <Image source={item} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default GallerySection;
