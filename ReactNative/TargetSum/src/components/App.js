import React, {Component} from 'react';
import Game from './Game';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Game randomNumberCount={6}/>
    );
  }
}