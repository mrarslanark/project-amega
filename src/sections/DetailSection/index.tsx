import React from 'react';
import {FlatList, View} from 'react-native';
import DetailItem from '../../components/DetailItem';
import {styles} from './styles';
import {NetworkDetails} from '../../services/WhoIs';

interface DetailSectionProps {
  details: NetworkDetails[] | null;
}

const DetailSection: React.FC<DetailSectionProps> = ({
  details,
}): React.JSX.Element | null => {
  if (!details) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        numColumns={2}
        data={details}
        columnWrapperStyle={styles.columnStyle}
        contentContainerStyle={styles.contentStyle}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <DetailItem title={item.title} value={item.value} />
        )}
      />
    </View>
  );
};

export default DetailSection;
