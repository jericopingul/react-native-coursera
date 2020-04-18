import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View } from 'react-native';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <View>
        <Menu
          dishes={this.state.dishes}
          onPress={(dishId) => this.onDishSelect(dishId)}
        />
        <Dishdetail
          dish={this.state.dishes.find(
            (dish) => dish.id === this.state.selectedDish
          )}
        ></Dishdetail>
      </View>
    );
  }
}

export default Main;
