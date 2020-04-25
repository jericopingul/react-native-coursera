import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (comment) => dispatch(postComment(comment)),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
});

const RenderDish = ({ dish, favorite, onFavorite, onEdit }) => {
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={styles.dishIcons}>
          <Icon
            raised
            reverse
            name={favorite ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => {
              favorite ? console.log('Already favorite') : onFavorite();
            }}
          />
          <Icon
            raised
            reverse
            name={'pencil'}
            type='font-awesome'
            color='#512DA8'
            onPress={() => {
              onEdit();
            }}
          />
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
};

const RenderComments = ({ comments }) => {
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}
        </Text>
      </View>
    );
  };

  return (
    <Card title='Comments'>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
};

class Dishdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      rating: 3,
      author: 'author',
      comment: 'comment',
    };
  }

  static navigationOptions = {
    title: 'Dish Details',
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      rating: 0,
      author: '',
      comment: '',
    });
  }

  onRatingChange(rating) {
    console.log('rating', rating);
    this.setState({
      rating,
    });
  }

  onAuthorChange(author) {
    console.log('author', author);
    this.setState({
      author,
    });
  }

  onCommentChange(comment) {
    console.log('comment', comment);
    this.setState({
      comment,
    });
  }

  handleComment() {
    const { rating, author, comment } = this.state;

    this.props.postComment({
      rating,
      author,
      comment,
      dishId: this.props.navigation.getParam('dishId', ''),
    });
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onFavorite={() => this.markFavorite(dishId)}
          onEdit={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {
            this.toggleModal();
            this.resetForm();
          }}
          onRequestClose={() => {
            this.toggleModal();
            this.resetForm();
          }}
        >
          <View style={styles.modal}>
            <View style={styles.modalRating}>
              <Rating
                showRating
                startingValue={0}
                ratingCount={5}
                onFinishRating={(rating) => this.onRatingChange(rating)}
              />
            </View>
            <Input
              placeholder='Author'
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              leftIconContainerStyle={{ margin: 5 }}
              onChangeText={(text) => this.onAuthorChange(text)}
            />
            <Input
              placeholder='Comment'
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              leftIconContainerStyle={{ margin: 5 }}
              onChangeText={(text) => this.onCommentChange(text)}
            />
            <View style={styles.modalButtonContainer}>
              <View style={styles.modalButton}>
                <Button
                  onPress={() => {
                    console.log('submit pressed');
                    this.toggleModal();
                    this.handleComment();
                    this.resetForm();
                  }}
                  color='#512DA8'
                  title='SUBMIT'
                />
              </View>
              <View style={styles.modalButton}>
                <Button
                  onPress={() => {
                    this.toggleModal();
                    this.resetForm();
                  }}
                  color='grey'
                  title='CANCEL'
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  dishIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalRating: {
    margin: 20,
  },
  modalButtonContainer: {
    margin: 10,
  },
  modalButton: {
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
