import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  StyleSheet} from 'react-native';

type Props = {};
export default class RandomNumber extends Component<Props> {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    this.props.onPress(this.props.id);
  };

  render = () => (
    <TouchableOpacity onPress={this.handlePress}>
      <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>
        {this.props.number}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: 'white',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    textAlign: 'center',
    fontSize: 50,
  },
  disabled: {
    opacity: 0.3,
  }
});