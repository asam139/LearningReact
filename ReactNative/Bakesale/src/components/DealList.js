import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList, StyleSheet} from 'react-native';

import DealItem from './DealItem'

type Props = {};
export default class DealList extends Component<Props> {
  static propTypes = {
    deals: PropTypes.array.isRequired,
  };

  render() {
    console.log(this.props.deals)
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => <DealItem deal={item}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex:1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 50,
  },
});
