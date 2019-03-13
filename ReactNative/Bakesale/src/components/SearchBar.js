import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import {TextInput, StyleSheet} from 'react-native';

export default class SearchBar extends Component {
  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
    initialSearchTearms: PropTypes.string.isRequired,
  };

  state = {
    searchTerm: this.props.initialSearchTearms,
  };

  searchDeals = () => {
    this.props.searchDeals(searchTerm);
    this.inputElement.blur();
  };

  debouncedSearchDeals = debounce(this.searchDeals, 300);

  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearchDeals(this.state.searchTerm)
    });
  };

  render() {
    return (
      <TextInput
        style={styles.input}
        placeholder='Search deals...'
        onChangeText={this.handleChange}
        ref={(inputElement) => { this.inputElement = inputElement; }}
        value={this.state.searchTerm}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 12,
    height: 40,
  },
});