import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Card, CardItem } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default ({ record, carouselIndex, activeCarouselIndex }) => {
  const recordData = record.content;
  const actualIndex = record.page.offset * record.page.size + record.index;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: activeCarouselIndex ? 'lightsalmon' : 'white' },
      ]}
    >
      <Image
        style={{ width: 400, height: 400, resizeMode: 'cover' }}
        source={{ uri: record.content.image }}
      />
      <Text>{`page: ${record.page.offset}`}</Text>
      <Text>{`record: ${record.index + 1}/${record.page.size}`}</Text>
      <Text>{`actual index: ${actualIndex}`}</Text>
      <Text>{`carousel: ${carouselIndex}`}</Text>
      <Text>
        {JSON.stringify(record.page.data[record.index], undefined, 2)}
      </Text>
    </View>
  );
};
