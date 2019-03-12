/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import ajax from '../ajax'
import DealList from './DealList.js'

type Props = {};
export default class App extends Component<Props> {
  state = {
    deals: []
  };




  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals: deals });
    console.log(deals);
  }

  render() {
    console.log(this.state.deals);
    return (
      <View style={styles.container}>
        {this.state.deals.length > 0 ? (
          <DealList deals={this.state.deals}/>
        ) : (
          <Text style={styles.header}>Bakesale</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },
  header: {
    fontSize: 40,
  },
});
