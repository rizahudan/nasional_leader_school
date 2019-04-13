import React from 'react';
import Header from './components/header';

export default class Home extends React.Component {
  render() {
    this.data = (
      <div>
        <Header />
      </div>
    );
    return this.data;
  }
}
