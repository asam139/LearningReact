import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList, StyleSheet} from 'react-native';

import DealItem from './DealItem'

type Props = {};
export default class DealList extends Component<Props> {
  static propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => (
            <DealItem deal={item} onPress={this.props.onItemPress}/>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    width: '100%',
  },
});
