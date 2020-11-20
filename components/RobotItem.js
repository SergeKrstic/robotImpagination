import React, { Component } from 'react';
import { Text, Image } from 'react-native';

import { Card, CardItem } from 'native-base';

export default ({ record, onLayout }) => {
  const recordData = record.content;

  const findDimensions = (layout) => {
    const { x, y, width, height } = layout;
    console.log({ x });
    console.log({ y });
    console.log({ width });
    console.log({ height });
  };

  return (
    <Card
      onLayout={(event) => {
        findDimensions(event.nativeEvent.layout);
      }}
      style={{ margin: 10 }}
    >
      <CardItem>
        <Text>{recordData.title}</Text>
      </CardItem>
      <CardItem>
        <Image
          style={{ width: 200, height: 200, resizeMode: 'cover' }}
          source={{ uri: record.content.image }}
        />
      </CardItem>
      <CardItem>
        <Text>{recordData.description}</Text>
      </CardItem>
    </Card>
  );
};
