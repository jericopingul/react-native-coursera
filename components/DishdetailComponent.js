import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require('./images/uthappizza.png')}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
};

const Dishdetail = ({ dish }) => {
  return <RenderDish dish={dish} />;
};

export default Dishdetail;
