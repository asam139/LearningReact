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
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

type Props = {};
export default class App extends Component<Props> {
  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  };

   searchDeals = async (searchTerm) => {
     let dealsFromSearch = [];
     if (dealsFromSearch) {
       dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm);
     }
     this.setState( { dealsFromSearch: dealsFromSearch })
  };

  setCurrentDeal = (dealId) => {
    this.setState( {
      currentDealId: dealId
    });
  };
  unsetCurrentDeal = () => {
    this.setState( {
      currentDealId: null
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
      return (
        <View style={styles.main}>
          <DealDetail
            initialDealData={this.currentDeal()}
            onBack={this.unsetCurrentDeal}
          />
        </View>
      )
    }
    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0 ?
      this.state.dealsFromSearch :
      this.state.deals;
    if(dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals}/>
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal}/>
        </View>
      )
    }

    return (
      <View style={styles.main}>
        <Text style={styles.header}>Bakesale</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  header: {
    fontSize: 40,
  },
});
