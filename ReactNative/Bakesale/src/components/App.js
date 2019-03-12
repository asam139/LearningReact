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
import DealDetail from "./DealDetail";

type Props = {};
export default class App extends Component<Props> {
  state = {
    deals: [],
    currentDealId: null,
  };

  setCurrentDeal = (dealId) => {
    this.setState( {
      currentDealId: dealId
    });
  };
  currentDeal = () => {
    return this.state.deals.find( (deal) =>
      deal.key === this.state.currentDealId
    );
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals: deals });
    console.log(deals);
  }

  render() {
    if(this.state.currentDealId) {
      let a = this.currentDeal()
      console.log(a)
      return <DealDetail initialDealData={this.currentDeal()}/>
    }
    if(this.state.deals.length > 0) {
      return <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal}/>
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bakesale</Text>
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
