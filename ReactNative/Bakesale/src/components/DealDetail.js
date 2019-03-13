import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
  Linking
} from 'react-native';
import {priceDisplay} from "../utils";
import ajax from '../ajax';

const dimensions = Dimensions.get('window');

export default class DealDetail extends Component {
  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      this.imageXPos.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      const width = dimensions.width;
      if (Math.abs(gestureState.dx) > width * 0.4) {
        const direction = Math.sign(gestureState.dx);
        // -1 for left, 1 for right
        Animated.timing(this.imageXPos, {
          toValue: direction * width,
          duration: 250
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start();
      }
    },
  });

  handleSwipe = (indexDirection) => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0,
      }).start();
      return;
    }
    this.setState((prevState) => ({
      imageIndex: prevState.imageIndex + indexDirection
    }), () => {
      // Next image animation
      const width = dimensions.width;
      this.imageXPos.setValue(indexDirection * width);
      Animated.spring(this.imageXPos, {
        toValue: 0,
      }).start();
    });
  };

  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({
      deal: fullDeal
    })
  }

  openDealUrl = () => {
    Linking.openURL(this.state.deal.url)
  };

  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          style={[{ left: this.imageXPos }, styles.image] }
          source={{ uri: deal.media[this.state.imageIndex] }}
        />
        <View style={styles.detail}>
          <View>
            <Text style={styles.title}>{deal.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            {deal.user && (
              <View style={styles.user}>
                <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          <View style={styles.description}>
            <Text>{deal.description}</Text>
          </View>
          <Button title='Buy this deal!' onPress={this.openDealUrl}/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  deal: {
    flex: 1,
  },
  backLink: {
    padding: 5,
    color: 'blue',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
});