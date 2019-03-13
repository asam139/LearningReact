/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Text, View, Animated, Easing, Dimensions, StyleSheet} from 'react-native';

import ajax from '../ajax'
import DealList from './DealList.js'
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

type Props = {};
export default class App extends Component<Props> {
  titleXPos = new Animated.Value(0);
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

  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
    Animated.timing(
      this.titleXPos, {
        toValue: direction * width * 0.5,
        duration: 1000,
        easing: Easing.ease,
      }
    ).start(( finished ) => {
      if(finished) {
        this.animateTitle(-1 * direction);
      }
    });
  };

  async componentDidMount() {
    //const deals = await ajax.fetchInitialDeals();
    //this.setState({ deals: deals });
    this.animateTitle()
  }

  render() {
    if(this.state.currentDealId) {
      return (
        <View style = {styles.container}>
          <View style={styles.main}>
            <DealDetail
              initialDealData={this.currentDeal()}
              onBack={this.unsetCurrentDeal}
            />
          </View>
        </View>
      )
    }
    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0 ?
      this.state.dealsFromSearch :
      this.state.deals;
    if(dealsToDisplay.length > 0) {
      return (
        <View style = {styles.container}>
          <View style={styles.main}>
            <SearchBar searchDeals={this.searchDeals}/>
            <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal}/>
          </View>
        </View>
      )
    }

    return (
      <View style = {styles.container}>
        <Animated.View style={[{ left: this.titleXPos }, styles.main]}>
          <Text style={styles.header}>Bakesale</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  header: {
    fontSize: 40,
  },
});
